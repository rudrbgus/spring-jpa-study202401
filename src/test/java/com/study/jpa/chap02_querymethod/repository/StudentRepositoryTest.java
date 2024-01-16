package com.study.jpa.chap02_querymethod.repository;

import com.study.jpa.chap02_querymethod.entity.Student;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
@Transactional
@Rollback(false)
class StudentRepositoryTest {

    @Autowired
    StudentRepository studentRepository;

    @BeforeEach
    void insertDate(){
        Student stu1 = Student.builder()
                .name("쿠로미")
                .city("청양군")
                .major("경제학")
                .build();
        Student stu2 = Student.builder()
                .name("춘식이")
                .city("천안시")
                .major("컴퓨터공학")
                .build();
        Student stu3 = Student.builder()
                .name("어피치")
                .city("제주도")
                .major("물리학")
                .build();
        studentRepository.save(stu1);
        studentRepository.save(stu2);
        studentRepository.save(stu3);
    }

    @Test
    @DisplayName("이름이 춘식이인 학생의 정보를 단일 조회한다.")
    void findBtNameTest() {
        //given
        String name="춘식이";
        //when
        List<Student> studentList = studentRepository.findByName(name);
        //then
        assertEquals(1, studentList.size());

        System.out.println("studentList.get(0) = " + studentList.get(0));
    }

    @Test
    @DisplayName("전공에 공학이 포함된 학생정보를 조회한다.")
    void findByContainingTest() {
        //given
        String majorKeyWord = "공학";
        //when
        List<Student> studentList = studentRepository.findByMajorContaining(majorKeyWord);
        //then
        assertEquals(1, studentList.size());

        studentList.forEach(System.out::println);
    }
    @Test
    @DisplayName("네이티브 sql로 이름으로 조회하기")
    void nativeSQLTest() {
        //given
        String name = "춘식이";
        //when
        Student student = studentRepository.findByyNameWithSQL(name);
        //then
        assertNotNull(student);
        assertEquals("천안시", student.getCity());
    }

    @Test
    @DisplayName("JPQL메서드로 사용한 도시이름 학생조회")
    void findByCityWithJPQL() {
        //given
        String city = "청양군";
        //when
        Student student = studentRepository.getByCityWithJPQL(city);
        //then
        assertEquals("쿠로미", student.getName());
    }

    @Test
    @DisplayName("테스트로 하나 삽입한다")
    void insertText() {
        //given
        Student stu = Student.builder()
                .name("말똥이")
                .city("춘천시")
                .major("한국미술")
                .build();
        //when
        studentRepository.save(stu);
        //then
    }

    @Test
    @DisplayName("JPQL을 이용한 이름으로 검색하기")
    void searchNameTest() {
        //given
        String name = "춘";
        //when
        List<Student> students = studentRepository.searchByNameWithJPQL(name);

        //then
        System.out.println("students = " + students.get(0));
    }

    @Test
    @DisplayName("JPQL로 삭제하기")
    void deleteWithJPQLTest() {
        //given
        String name = "어피치";
        String city = "제주도";
        //when
        studentRepository.deleteByWithJPQL(name, city);
        //then
        List<Student> studentList = studentRepository.findByName(name);
        assertEquals(0, studentList.size());
    }
}