# epub-translator

epub 파일을 번역 API를 이용해 통번역해주는 프로그램입니다.

## 지원 API

- nCloud Papago

## 환경 변수 (개발용)

- `BOOK_PATH`: `BOOK_PATH`에 있는 epub 파일을 곧바로 번역 작업을 시작합니다. (언어 한국어, 파파고 API 고정)
- `NO_TRANSLATION`: 번역 과정에서 번역 API를 호출하지 않습니다. (비용 세이브 용)
