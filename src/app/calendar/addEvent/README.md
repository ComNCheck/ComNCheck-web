# 이벤트 관리 시스템

## 개요

이 시스템은 PastEventAdd, NewEvent, AnotherEvent의 중복 코드를 해결하기 위해 공통 컴포넌트로 리팩토링된 이벤트 관리 시스템입니다.

## 주요 구조

### 1. EventForm 컴포넌트 (`components/EventForm.tsx`)

모든 이벤트 타입에서 공통으로 사용하는 메인 폼 컴포넌트입니다.

**특징:**

- 생성 모드(`create`)와 수정 모드(`edit`) 지원
- 세 가지 이벤트 타입 지원: `past`, `new`, `another`
- 기존행사는 카테고리 선택, 신규/기타행사는 행사명 입력
- 실제 API 연동 지원

**사용법:**

```tsx
// 생성 모드
<EventForm eventType="past" />

// 수정 모드
<EventForm
  eventType="new"
  mode="edit"
  initialData={eventData}
  eventId="123"
  onSubmit={handleCustomSubmit}
/>
```

### 2. API 모듈 (`api/eventApi.ts`)

이벤트 관련 API 호출을 담당하는 모듈입니다.

**주요 함수:**

- `createEvent(eventType, eventData)`: 이벤트 생성
- `updateEvent(eventType, eventId, eventData)`: 이벤트 수정
- `getEvent(eventType, eventId)`: 이벤트 조회

### 3. 페이지 구조

#### 생성 페이지들

- `/past-event/page.tsx`: 기존행사 추가
- `/new-event/page.tsx`: 신규행사 추가
- `/another-event/page.tsx`: 기타행사 추가

#### 수정 페이지들

- `/past-event/edit/[eventId]/page.tsx`: 기존행사 수정
- `/new-event/edit/[eventId]/page.tsx`: 신규행사 수정
- `/another-event/edit/[eventId]/page.tsx`: 기타행사 수정

## 사용 방법

### 1. 새 이벤트 추가

각 타입별 페이지로 이동하면 EventForm이 생성 모드로 렌더링됩니다.

### 2. 기존 이벤트 수정

수정하려는 이벤트의 ID를 가지고 다음 URL로 이동:

- 기존행사: `/calendar/addEvent/past-event/edit/[eventId]`
- 신규행사: `/calendar/addEvent/new-event/edit/[eventId]`
- 기타행사: `/calendar/addEvent/another-event/edit/[eventId]`

### 3. 커스텀 제출 핸들러

필요한 경우 커스텀 제출 핸들러를 제공할 수 있습니다:

```tsx
const handleCustomSubmit = (data) => {
  // 커스텀 로직
  console.log("커스텀 제출:", data);
};

<EventForm eventType="past" onSubmit={handleCustomSubmit} />;
```

## API 연동

### 환경 설정

`.env.local` 파일에 API URL을 설정하세요:

```
NEXT_PUBLIC_API_URL=https://your-api-server.com/api
```

### API 엔드포인트

시스템은 다음 엔드포인트를 가정합니다:

- **기존행사**

  - `POST /api/past-events`: 생성
  - `GET /api/past-events/{id}`: 조회
  - `PUT /api/past-events/{id}`: 수정

- **신규행사**

  - `POST /api/new-events`: 생성
  - `GET /api/new-events/{id}`: 조회
  - `PUT /api/new-events/{id}`: 수정

- **기타행사**
  - `POST /api/another-events`: 생성
  - `GET /api/another-events/{id}`: 조회
  - `PUT /api/another-events/{id}`: 수정

### API 응답 형식

```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}
```

## 개발 모드

개발 환경에서는 폼 하단에 디버깅 정보가 표시됩니다:

- 현재 입력된 데이터
- 완료된 단계
- 현재 모드 (생성/수정)
- 이벤트 ID (수정 모드)

## 확장성

새로운 이벤트 타입을 추가하려면:

1. `EventType`에 새 타입 추가
2. `eventTypeConfig`에 설정 추가
3. `eventApi.ts`에 API 함수 추가
4. 새 페이지 디렉토리 생성

## 주요 개선사항

1. **코드 중복 제거**: 177줄 → 5줄로 대폭 감소
2. **통합 API 관리**: 모든 API 호출이 중앙 집중화
3. **타입 안전성**: TypeScript로 강력한 타입 체크
4. **확장성**: 새로운 이벤트 타입 쉽게 추가 가능
5. **유지보수성**: 단일 컴포넌트 수정으로 모든 페이지 영향
