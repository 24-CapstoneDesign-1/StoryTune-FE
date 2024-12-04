# StoryTune Client
> 2024-2 CAU CapstoneDesign
<br/>


## 🐥 Service Info



<br/>

#### ✨ 나만의 이야기를 만들고, 친구들과 함께 롤플레잉을 해봐요! ✨

<br/>



<br/>

## 👩‍💻 Contributors

<table>
  <tbody>
      <td align="center"><a href="https://github.com/hyeonsoo0625"><img src="https://avatars.githubusercontent.com/hyeonsoo0625" width="100px;" alt=""/><br /><sub><b>FE : 김현수 </b></sub></a><br /></td>
      <td align="center"><a href="https://github.com/Jihaeee"><img src="https://avatars.githubusercontent.com/Jihaeee" width="100px;" alt=""/><br /><sub><b>FE : 강지혜 </b></sub></a><br /></td>
  </tbody>
</table>

<br/>


## ⚒️ Tech Stack
<div align="center">
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white"> <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"><br/><img src="https://img.shields.io/badge/zustand-3178C6?style=for-the-badge&logo=zustand&logoColor=white"> <img src="https://img.shields.io/badge/react router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white"> <img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white"> <br/> <img src="https://img.shields.io/badge/ChatGPT API-green?style=for-the-badge&logo=zustand&logoColor=white"> <img src="https://img.shields.io/badge/Naver CLOVA API (CSR)-g?style=for-the-badge&logo=zustand&logoColor=white">
</div>

<br/>

<br/>


## 🍀 Infra Architecture

![image](https://github.com/user-attachments/assets/e30ec1f3-9a98-47f5-9ecf-edf0e11a95aa)

<br/>

## 📝 Project Architecture

BookSpud 서버는 MVC 패턴을 기반으로 개발했습니다.
<br/><br/>

![image](https://github.com/24-2-CapstoneDesign/Back_Spring/assets/80567210/c9a04da8-8cab-48ee-89a7-e72496e512fb)


### Controller
- 사용자의 요청이 진입하는 지점
- 클라이언트가 API로 요청을 보내면 서버에서 요청을 처리한 후 API를 통해 결과를 반환합니다.

### Service
- 비즈니스 로직을 수행하는 계층
- Repository에서 받아온 데이터를 가공하여 Controller에 반환합니다.

### Repository
- Entity에 의해 생성된 DB에 접근하는 메서드들을 이용하기 위한 인터페이스
- JPA interface method를 활용하여 기본적인 CRUD 연산을 수행합니다.

<br/>

<p align="right"><a href="#readme-top">back to top</a></p>