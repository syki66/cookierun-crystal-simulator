# cookierun-crystal-simulator

카카오 쿠키런 모바일 게임의 크리스탈 보유효과 보물들을 사용자가 입력하여 미래 크리스탈 기댓값을 실시간으로 예측해서 시각화해주는 시뮬레이션 웹사이트 [(Live Demo)](https://cookierun.syki66.com)

## Screenshots

| img1  | img2  |
| :---: | :---: |
| ![]() | ![]() |

## Built With

- Next.js (App Router)
- Typescript
- Tailwind CSS
- shadcn/ui
- Autoprefixer
- Husky
- React Hook Form
- Zod
- Recharts

## Features

- 크리스탈 기댓값 시뮬레이션 페이지
- 보물 뽑기 시뮬레이션 페이지 (단일 뽑기, 세트 뽑기)
- 기댓값 계산기 페이지
- 사용자 입력 Form 및 유효성 검증 구현 (React Hook Form, Zod)
- 데이터를 그래프로 시각화 (Recharts)
- 데이터 변화에 따라 실시간 화면 갱신
- 대시보드, 인벤토리, 결과창 컴포넌트 구현
- 화면 크기에 따른 반응형 디자인 적용
- CSR이 필요한 부분만 따로 컴포넌트화 진행
- Autoprefixer를 적용하여 브라우저 호환성 유지
- 커밋 전 lint 검사 자동화 (Husky)

## Caution

- [쿠키런 고객센터에 공개된 확률정보](https://cookierun.zendesk.com/hc/ko/articles/28813434627993-상세정보)를 바탕으로 제작됨
- 오랜 시간 시뮬레이션이 실행되면 웹 브라우져가 느려질 수 있음
- 같은 데이터로 시뮬레이션 되더라도 초기 운에 의해 편차가 커질 수 있음

## How it works

1. useEffect 구문의 setInterval 함수 내부에 시뮬레이터 로직이 반복적으로 실행되며 데이터가 갱신됨
2. 데이터가 갱신될때마다 useState는 갱신된 값을 화면에 표기

## Directory

```
root
├── app                         # 라우팅 처리
├── components                  # 컴포넌트 관리
├── data                        # 데이터 관리
├── lib                         # 함수 관리
├── public                      # 이미지 데이터 관리
└── types                       # 타입 관리
```

## Installation

```bash
npm install
```

```bash
npm run dev
```

## Build & Deployment

- Vercel 자동 배포 이용
