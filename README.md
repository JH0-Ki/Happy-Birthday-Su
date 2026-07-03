# 생일 축하 웹페이지

여자친구 생일을 축하하기 위한 싱글 페이지 이벤트 사이트입니다.

## 흐름
1. "시작하기" 버튼 클릭
2. 5 → 4 → 3 → 2 → 1 카운트다운 (숫자가 바뀔 때마다 사진도 전환)
3. 배경음악 재생 + 편지 타이핑 효과 (1분)
4. 화면 암전 + 폭죽 애니메이션

## 실제 콘텐츠로 교체하는 방법

### 1) 사진 교체
`assets/photos/` 폴더에 있는 `photo1.svg` ~ `photo5.svg`를 실제 사진으로 바꿔주세요.

- 가장 쉬운 방법: 사진을 `photo1.jpg` ~ `photo5.jpg`로 이름 붙여 같은 폴더에 넣고,
  `script.js` 안의 `photos` 객체에서 확장자를 `.svg` → `.jpg`로 바꿔주세요.

```js
const photos = {
  5: 'assets/photos/photo5.jpg',
  4: 'assets/photos/photo4.jpg',
  3: 'assets/photos/photo3.jpg',
  2: 'assets/photos/photo2.jpg',
  1: 'assets/photos/photo1.jpg',
};
```

### 2) 배경음악 교체
`assets/music/` 폴더에 mp3 파일을 넣고 파일명을 `bgm.mp3`로 맞춰주세요.
(현재는 placeholder 파일이 없어서 음악 없이 진행되며, 콘솔에 경고만 출력됩니다.)

### 3) 편지 내용 수정
`script.js` 맨 위쪽의 `letterText` 변수 내용을 원하는 문구로 바꿔주세요.

```js
const letterText = `사랑하는 OO에게,
...
`;
```

### 4) 편지를 보여줄 시간(초) 조절
`script.js`의 `LETTER_DURATION_SEC` 값을 원하는 초로 바꾸면 됩니다. (기본값 60초)

## 로컬에서 확인하기
`index.html` 파일을 더블클릭해서 브라우저로 바로 열어도 되고,
VSCode의 Live Server 같은 확장을 쓰면 더 편하게 새로고침하며 확인할 수 있습니다.

## GitHub Pages로 무료 배포하기 (도메인 구매 불필요)

1. GitHub에 새 저장소를 만듭니다. (예: `birthday-2026`)
2. 이 `birthday-site` 폴더 안의 파일 전체를 그 저장소에 업로드(push)합니다.

```bash
cd birthday-site
git init
git add .
git commit -m "생일 축하 웹페이지"
git branch -M main
git remote add origin https://github.com/<내깃헙아이디>/birthday-2026.git
git push -u origin main
```

3. GitHub 저장소 페이지에서 **Settings → Pages**로 이동합니다.
4. **Source**를 `Deploy from a branch`, 브랜치는 `main`, 폴더는 `/(root)`로 설정 후 저장합니다.
5. 1~2분 후 아래 주소로 접속할 수 있습니다.

```
https://<내깃헙아이디>.github.io/birthday-2026/
```

도메인을 별도로 구매하지 않아도 위 주소만으로 여자친구에게 링크를 보낼 수 있습니다.
