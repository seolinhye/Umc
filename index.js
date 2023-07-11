/*console.log("Hello World")
const http = require('http');


http.createServer(function (req, res){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('Hello World');
}).listen(3000, '127.0.0.1');

console.log('Server running at http://127.0.0.1:3000/');
*/


const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/db.config.js');
const app = express();
//const database = require('./database');
const mysql = require('mysql');

// bodyParser 설정
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = app.listen(3000, function(){
    console.log("Express server start port 3000");
})


// 데이터베이스 연결
const connection = mysql.createConnection({
    host: dbConfig.HOST,
    port: 3306,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
  });

connection.connect(error => {
    if(error) {
        console.error('Failed to connect to the database: ' + error.stack);
        return;
    }
    console.log("Success connected to the database");
});

//get method 실행
/*app.get('/test', function(req, res){
    console.log('Hello World');


    //module.exports = connection;
    //connection.connect();

    //2. userinfo 테이블에 있는 정보 가져오기
    const getUserQuery = 'SELECT userID, userNickName, phoneNum FROM user';
    //const getUserResult = 
    connection.query(getUserQuery, function(err, rows, fields){
        if(err){
            console.error(err);
            return res.status(500).send("데이터베이스 오류");
            
        } else{
            if(rows.length === 0){
                return res.status(404).send("회원정보가 조회되지 않습니다.");
            }else{
                console.log(rows[0])
                return res.send(rows[0]);
            }
        
        }
    });
}); */

app.get('/test', function(req, res) {
    const getUserQuery = 'SELECT userID, usrNickName, phoneNum FROM user';
  
    connection.query(getUserQuery, function(err, rows, fields) {
      if (err) {
        console.error(err);
        return res.status(500).send("데이터베이스 오류");
      } else {
        if (rows.length === 0) {
          return res.status(404).send("회원정보가 조회되지 않습니다.");
        } else {
          const userInfo = rows[0];
          const response = {
            userID: userInfo.userID,
            userNickName: userInfo.userNickName,
            phoneNum: userInfo.phoneNum
          };
          return res.json(response);
        }
      }
    });
  });

  // GET - 특정 사용자 정보 가져오기
app.get('/users/:id', function(req, res) {
    const userId = req.params.id;
    const getUserQuery = 'SELECT userID, usrNickName, phoneNum FROM user WHERE userID = ?';
    const params = [userId];

    connection.query(getUserQuery, params, function(err, rows, fields) {
        if (err) {
            console.error(err);
            return res.status(500).send("데이터베이스 오류");
        } else {
            if (rows.length === 0) {
                return res.status(404).send("해당 사용자를 찾을 수 없습니다.");
            } else {
                return res.json(rows[0]);
            }
        }
    });
});

// GET - 필터링된 사용자 목록 가져오기
app.get('/users', function(req, res) {
    const userName = req.query.usrNickName;
    let getUsersQuery = 'SELECT userID, usrNickName, phoneNum FROM user';
  
    // Query String에 이름이 제공되면 필터링을 수행
    if (userName) {
      getUsersQuery += ' WHERE usrNickName = ?';
      const params = [userName];
  
      connection.query(getUsersQuery, params, function(err, rows, fields) {
        if (err) {
          console.error(err);
          return res.status(500).send("데이터베이스 오류");
        } else {
          return res.json(rows);
        }
      });
    } else {
      connection.query(getUsersQuery, function(err, rows, fields) {
        if (err) {
          console.error(err);
          return res.status(500).send("데이터베이스 오류");
        } else {
          return res.json(rows);
        }
      });
    }
  });
  
  

// POST - 새로운 사용자 생성
app.post('/users', function(req, res) {
    const { phoneNum, usrNickName, imgUrl } = req.body;
    
    // 형식적 및 논리적 유효성 검사
    const validationResult = validateUserData(phoneNum, usrNickName, imgUrl);
    if (!validationResult.valid) {
        return res.status(400).json({ error: validationResult.error });
    }
    // 새로운 사용자를 데이터베이스에 삽입하는 로직
    const insertUserQuery = 'INSERT INTO User (phoneNum, usrNickName, imgUrl) VALUES (?, ?, ?)';
    const params = [phoneNum, usrNickName, imgUrl];
    
    connection.query(insertUserQuery, params, function(err, result) {
      if (err) {
        console.error(err);
        return res.status(500).send("데이터베이스 오류");
      } else {
        const newUserId = result.insertId;
        const response = {
          userId: newUserId,
          phoneNum: phoneNum,
          usrNickName: usrNickName,
          imgUrl: imgUrl
        };
        return res.status(201).json(response);
      }
    });
  });
  

// 형식적 및 논리적 유효성 검사 함수
function validateUserData(phoneNum, usrNickName, imgUrl) {
    if (!phoneNum || !usrNickName || !imgUrl) {
      return {
        valid: false,
        error: '모든 필드를 입력해야 합니다.'
      };
    }
  
    // imgUrl이 유효한 URL 형식인지 확인
    const urlPattern = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i;
    if (!urlPattern.test(imgUrl)) {
      return {
        valid: false,
        error: '유효하지 않은 이미지 URL입니다.'
      };
    }
  
    // 추가적인 유효성 검사 로직 추가
  
    return {
      valid: true
    };
  }
  