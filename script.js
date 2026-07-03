// ====== 편지 내용 (여기만 수정하면 됩니다) ======
const letterText = `안녕 수현! 26번째 생일 축하해 ㅎㅎ

어때~ 올해는 좀 다른 방식으로 편지를 써봤어! 요즘 한창 공부하고 있는 건데, 신기하지?! 공주한테 꼭 한번 이런 거 해주고 싶었어 히히

공주야, 그동안 정말 고생 많았어. 취업 때문에 걱정도 많았을 텐데(많았지?) 씩씩하게 한 번에 딱 붙어서 다니는 모습이 정말 예쁘고 멋져.

어린 나이에 합격해서 아침마다 출근하는 것도 힘들지? 회사에서는 막내 노릇도 해야 하는데, 일할 때는 막내로 안 봐주고… 우리 공주 고생이 많다 ㅠㅠ

그래도 공주가 이렇게 회사 다니면서 나랑 놀러 다니는 게 꿈만 같아서, 나는 요즘 너무 행복해.
요즘 이사하고 공부하느라 신경 많이 못 써줘서 미안해 ㅠㅠ 나의 사과를 받아주려무나 ㅠㅠ
이제 이사도 시험도 다 끝났으니까 공주랑 재밌게 놀 일만 남았어!!

오늘도 재밌었지??? 갑자기 생각이 나네 ㅋㅋ 오늘은 우리 안 싸웠겠지? ㅠㅠㅋㅋㅋ 공주랑 싸울 때마다 마음이 아프면서도, 돌아보면 내가 잘못한 것도 많은거 같아. 잘해야지 하면서도 자꾸 싸우게 돼서 미안해. 공주 마음을 더 이해하고 헤아리는, 마음 넓은 남자친구가 될게. (그래도 우리 싸워도 금방 잘 화해하니까 괜찮지?)

그리고 공주가 어디로 발령받더라도 나는 늘 공주 옆에 있을 거니까 걱정하지 마세요!! 나 항상 말한 건 지키잖아? 이번에도 믿어주세요.
앞으로 더 사이좋게 지내고, 여행도 많이 다니면서 추억 잔뜩 쌓자!! (일본 고고씽!!)
열심히 공부하는 와중에 써서 그런지 글이 좀 뒤죽박죽 같은데.. 양해바라오..(양해 너무 많이 바라나?)

공주야, 늘 사랑하고 생일 진심으로 축하해. ♥`;

// ====== 슬라이드쇼 사진 목록 (assets/photos 폴더의 파일들) ======
const PHOTO_COUNT = 20;
const photos = Array.from({ length: PHOTO_COUNT }, (_, i) =>
  `assets/photos/photo${String(i + 1).padStart(2, '0')}.jpg`
);

// ====== 슬라이드쇼 속도(밀리초) ======
const SLIDE_INTERVAL_MS = 3000; // 다음 사진으로 넘어가는 간격 (겹치며 크로스페이드)

// ====== 편지를 보여줄 시간(초) ======
const LETTER_DURATION_SEC = 90; // 편지가 길어져 60초 -> 90초로 늘림 (타이핑 약 38초 + 읽는 시간)

// ====== 배경음악 유튜브 영상 ID (링크의 v= 뒷부분) ======
const YOUTUBE_VIDEO_ID = 'BpsjVQF-Bq8';

const screens = {
  start: document.getElementById('start-screen'),
  slideshow: document.getElementById('slideshow-screen'),
  letter: document.getElementById('letter-screen'),
  firework: document.getElementById('firework-screen'),
};

const slideEls = [document.getElementById('slide-a'), document.getElementById('slide-b')];
const letterTextEl = document.getElementById('letter-text');
const startBtn = document.getElementById('start-btn');

// ====== 유튜브 플레이어 준비 ======
let ytPlayer = null;
let ytReady = false;
let musicRequested = false; // 플레이어 준비 전에 재생 요청이 온 경우 대비

(function loadYouTubeAPI() {
  const tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  document.head.appendChild(tag);
})();

// 유튜브 API가 로드되면 자동으로 호출되는 전역 콜백
window.onYouTubeIframeAPIReady = function () {
  ytPlayer = new YT.Player('yt-player', {
    videoId: YOUTUBE_VIDEO_ID,
    playerVars: {
      autoplay: 0,
      controls: 0,
      disablekb: 1,
      rel: 0,
      playsinline: 1,
      loop: 1,
      playlist: YOUTUBE_VIDEO_ID, // loop를 위해 필요
    },
    events: {
      onReady: () => {
        ytReady = true;
        if (musicRequested) playMusic();
      },
    },
  });
};

function playMusic() {
  musicRequested = true;
  if (ytReady && ytPlayer) {
    // 이미 재생 중이면 그대로 두고, 아니면 재생 시작
    if (ytPlayer.getPlayerState() !== YT.PlayerState.PLAYING) {
      ytPlayer.unMute();
      ytPlayer.setVolume(70);
      ytPlayer.playVideo();
    }
  }
}

function stopMusic() {
  if (ytReady && ytPlayer) {
    ytPlayer.pauseVideo();
  }
}

function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.remove('active'));
  screens[name].classList.add('active');
}

function startSequence() {
  // 모바일 자동재생 정책 때문에 음악은 반드시 사용자가 버튼을 누르는 순간 시작해야 함
  playMusic();
  showScreen('slideshow');
  // 다음 사진이 즉시 뜨도록 미리 로드
  photos.forEach(src => { const img = new Image(); img.src = src; });
  runSlideshow(0);
}

function runSlideshow(idx) {
  if (idx >= photos.length) {
    // 마지막 사진이 사라진 뒤 편지로
    slideEls.forEach(el => el.classList.remove('visible'));
    setTimeout(startLetterStage, 1500);
    return;
  }

  const current = slideEls[idx % 2];      // 이번에 나타날 이미지
  const previous = slideEls[(idx + 1) % 2]; // 지금 보이고 있는 이미지

  current.src = photos[idx];
  current.classList.add('visible');       // 새 사진 페이드 인
  previous.classList.remove('visible');   // 이전 사진 페이드 아웃 (동시에 겹침)

  setTimeout(() => runSlideshow(idx + 1), SLIDE_INTERVAL_MS);
}

function startLetterStage() {
  showScreen('letter');
  playMusic();

  typeLetter(letterText, letterTextEl, () => {});

  setTimeout(() => {
    startFireworkStage();
  }, LETTER_DURATION_SEC * 1000);
}

function typeLetter(text, el, onDone) {
  el.textContent = '';
  const box = document.getElementById('letter-box');
  let i = 0;
  const typingSpeed = 40; // ms per char
  function step() {
    if (i < text.length) {
      el.textContent += text[i];
      i++;
      box.scrollTop = box.scrollHeight; // 타이핑 따라 자동 스크롤
      setTimeout(step, typingSpeed);
    } else {
      onDone && onDone();
    }
  }
  step();
}

function startFireworkStage() {
  showScreen('firework');
  if (window.startFireworks) {
    window.startFireworks();
  }
}

startBtn.addEventListener('click', startSequence);
