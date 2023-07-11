import java.util.InputMismatchException;
import java.util.Scanner;
class Student {
    private String name = "이름";
    private int studentID = 0000;
    private String major = "전공";
    Student(){

    }
    void printInfo(){
        System.out.printf("%s , %d, %s \n", name, studentID, major);
    }
    boolean isEven(int i){
        if(i%2 == 0){
            return true;
        }
        else return false;
    }


    public static void main(String[] args){
        Student s = new Student();
        Scanner sc = new Scanner(System.in);

        int result;
        try {
            int i = sc.nextInt();
            result = i/10;
            System.out.println(result);
        }catch (InputMismatchException e){
            System.out.println("Cannot divide by zero");
        }
    }
}

