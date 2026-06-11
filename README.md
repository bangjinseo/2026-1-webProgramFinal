# Localization Lab

Localization Lab은 다국어 환경에서 UI 문구가 버튼, 카드, 모달, 네비게이션, 사이드바, 검색 영역 안에서 어떻게 표시되는지 검증하는 React 기반 MVP 프로젝트입니다.

사용자가 문장을 입력하거나 Mock Dictionary 예시를 선택하면 PreText 기반 레이아웃 계산을 통해 줄 수, 텍스트 높이, 자연 폭, overflow 여부를 확인하고 `Safe`, `Wrap`, `Overflow Risk` 결과를 제공합니다.

현재 버전은 실제 번역 API가 연결되지 않은 시연용 MVP입니다. 다국어 비교와 예시 문구는 Mock Dictionary를 기반으로 동작하며, 사용자가 입력한 모든 문장을 자동 번역하는 단계까지는 구현하지 않았습니다.

## 실행 방법

프로젝트 폴더로 이동합니다.

```bash
cd /Users/Desktop/finalExam
```

필요한 패키지가 설치되어 있지 않다면 한 번만 설치합니다.

```bash
npm install
```

개발 서버를 실행합니다.

```bash
npm run dev
```

터미널에 표시되는 로컬 주소를 브라우저에서 열어 확인합니다. 보통 아래 주소 중 하나로 실행됩니다.

```text
http://localhost:5173
```

배포용 파일을 확인하려면 빌드를 실행합니다.

```bash
npm run build
```

빌드 결과는 `dist` 폴더에 생성됩니다.

*만약 실행이 안되는 경우 
https://2026-1-web-program-final.vercel.app
배포한 링크입니다. 여기서 확인해주세요.



## 주요 기능

- Button Preview: 버튼 문구가 한 줄 컨트롤 안에 들어가는지 검증
- Card Preview: 카드 UI에서 문장 길이에 따른 높이 변화를 확인
- Modal Preview: 모달 본문 안에서 문구가 읽기 좋게 표시되는지 확인
- Navigation Preview: 탭과 네비게이션 라벨의 줄바꿈 및 잘림 위험 확인
- Sidebar Preview: 사이드바 메뉴 문구의 폭 초과, 줄바꿈, 높이 증가 확인
- Search Preview: 검색창 placeholder와 검색 결과 제목의 overflow 확인
- Multi-Language Comparison: Button Preview, Navigation Preview, Search Preview에서 English, Korean, Japanese, German, French 문구를 동시에 비교
- Risk Reason: 위험 결과가 나온 이유를 계산값 기반으로 설명
- Recommendation: Wrap 또는 Overflow Risk 발생 시 수정 방향 제안

## 프로젝트 구조

```text
finalExam/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── data/
│   ├── hooks/
│   ├── layouts/
│   ├── lib/
│   ├── pages/
│   ├── services/
│   ├── styles/
│   ├── App.jsx
│   └── main.jsx
├── package.json
└── README.md
```

## 폴더 설명

- `src/pages`: 메뉴별 화면 단위 컴포넌트
- `src/components`: 재사용 가능한 UI 컴포넌트
- `src/layouts`: 앱 전체 창 구조와 레이아웃 컴포넌트
- `src/services`: Mock Dictionary 기반 번역 및 데이터 조회 로직
- `src/hooks`: React에서 재사용하는 hook
- `src/data`: 메뉴, 언어 옵션, Preview 스펙, 다국어 Mock Dictionary 데이터
- `src/styles`: 전역 스타일과 Finder/Glass UI 기반 디자인 스타일
- `src/assets`: 배경 이미지와 Sidebar 아이콘 등 정적 에셋
- `src/lib`: PreText 레이아웃 분석, 위험 원인, 추천 계산 유틸
- `public`: 정적 public 파일

## 데이터와 외부 서비스

현재 프로젝트는 발표와 테스트를 위해 Mock Dictionary를 사용합니다. 이 Dictionary는 자주 쓰이는 UI 문구를 미리 여러 언어로 작성해둔 시연용 데이터입니다.

따라서 현재 MVP에서는 Dictionary에 포함된 문구를 선택하거나 입력했을 때 언어별 비교가 가장 자연스럽게 동작합니다. Dictionary에 없는 임의의 문장은 자동 번역되지 않으며, 현재 입력된 문구를 기준으로 레이아웃 검증을 수행합니다.

Supabase와 실제 번역 API는 아직 연결하지 않았습니다. 향후 Google Translation, DeepL, Papago, OpenAI API 등 실제 번역 서비스를 연결하여 사용자가 입력한 임의의 문장도 자동 번역 후 레이아웃을 검증할 수 있도록 확장할 예정입니다.

## Multi-Language Comparison 적용 범위

현재 Multi-Language Comparison은 우선순위가 높은 아래 세 화면에 적용되어 있습니다.

- `Button Preview`: 버튼 라벨은 폭이 좁고 한 줄 제한이 강해 언어별 길이 차이가 크게 드러납니다.
- `Navigation Preview`: 탭과 네비게이션 라벨은 짧은 공간 안에서 줄바꿈이나 잘림이 자주 발생합니다.
- `Search Preview`: 검색창 placeholder는 긴 문장이 들어갈 때 overflow 위험이 크기 때문에 비교 대상으로 적합합니다.

아래 화면은 현재 개별 컴포넌트 검증 중심으로 구현되어 있으며, 이후 같은 구조를 확장할 수 있습니다.

- `Card Preview`
- `Modal Preview`
- `Sidebar Preview`

## 디자인 방향

기존 `bjsProject`의 Finder Sidebar, Notes Content Area, Glass UI 분위기를 참고하되, finalExam은 기능성과 실용성을 중심으로 가볍게 구성했습니다.

디자인 원칙은 Human Interface Guidelines에서 강조하는 Localization, Accessibility, Readability, Content First 방향을 참고했습니다.

배경은 정적인 SVG 이미지를 사용하며, 과도한 gradient animation이나 무거운 hover 효과는 적용하지 않았습니다.

## 참고

초기 구조 정리 시 `bjsProject` 백업 스냅샷은 아래 위치에 보관되어 있습니다.

```text
../bjsProject/backups/finalExam-prep-2026-06-10
```
