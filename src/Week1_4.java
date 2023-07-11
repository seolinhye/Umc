public class Week1_4 {
    public static int main (String s){
        int length = s.length();
        int answer = Integer.MAX_VALUE;

        for(int i=1; i<=s.length()/2;i++) {
            String zipPattern = s.substring(0, i);
            int count = 1;
            String str = "";


            for (int j = i; j<=s.length()-i; j+=i) {
                if(zipPattern.equals(s.substring(j,j+i))){
                    count++;
                }
                else{
                    if(count>1){
                        str += count+"";
                    }
                    str += zipPattern;
                    zipPattern = s.substring(j,j+i);
                    count = 1;
                }
            }
            if(count>1){
                str += count + "";
            }

                str += zipPattern;
                int remain = s.length() % i;
                answer = Math.min(answer, str.length() + remain);

        }
        return answer;
    }

}
