import java.util.Scanner;
public class Test2566 {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int n = 0;
        int m = 0;
        int max = 0;
        int[][] array = new int[10][10];

        for (int i=0; i<9; i++){
            for (int j=0; j<9; j++){
                array[i][j] = sc.nextInt();
                if (max < array[i][j]){
                    max = array[i][j];
                    n = i;
                    m = j;
                }
            }
        }
        System.out.println(max);
        System.out.println((n+1) + " " + (m+1));

    }
}
