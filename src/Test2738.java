import java.util.Scanner;
public class Test2738 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int[][] array;
        int[][] array2;
        int[][] resultarray;
        int n = sc.nextInt();
        int m = sc.nextInt();
        array = new int[n][m];
        array2 = new int[n][m];
        resultarray = new int[n][m];

        for (int i=0; i<n; i++){
            for(int j=0; j<n; j++){
                array[i][j] = sc.nextInt();
            }
        }
        for (int i=0; i<n; i++){
            for(int j=0; j<n; j++){
                array2[i][j] = sc.nextInt();
            }
        }
        for (int i=0; i<n; i++){
            for(int j=0; j<n; j++){
                resultarray[i][j] = array[i][j] + array2[i][j];
            }
        }
        for (int i=0; i< resultarray.length; i++){
            int[] inArr = resultarray[i];
            for(int j=0; j< resultarray.length; j++){
                System.out.print(inArr[j]+ " ");
            }
            System.out.println();
        }
    }
}
