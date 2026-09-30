# Spec: 미니 방명록 MVP

## 요구사항 (시험 문제 그대로)
1. `entries` 테이블: `id`, `name`, `message`, `password_hash`, `created_at`,
   `updated_at`.
2. Create: 누구나 이름 + 메시지 + 비밀번호로 새 글 작성.
3. Read: 누구나 전체 글 목록 조회, 최신 작성 순 정렬.
4. Update: 비밀번호 일치 시에만 메시지 수정 가능. 불일치 시 거부 + 안내.
5. Delete: 비밀번호 일치 시에만 삭제 가능. 불일치 시 거부 + 안내.
6. UI에 개발자 이름(민성)과 학번(202204182) 표시.

## API
- `POST /api/entries` — `{ name, message, password }` → 201 + 생성된 글
  (비밀번호 해시는 응답에 포함하지 않음).
- `GET /api/entries` — 전체 글, `created_at desc` 정렬.
- `PATCH /api/entries/[id]` — `{ message, password }` → 비밀번호 불일치
  403, 글 없음 404, 성공 시 200 + 갱신된 글.
- `DELETE /api/entries/[id]` — `{ password }` → 비밀번호 불일치 403, 글
  없음 404, 성공 시 200.

## 성공 기준
- 목록이 항상 최신순이다.
- 틀린 비밀번호로 수정/삭제를 시도하면 명확한 에러 메시지가 화면에
  보이고, 실제로 아무것도 바뀌지 않는다.
- 비밀번호는 DB에 평문으로 남지 않는다.
- 배포된 화면에 "민성 · 202204182"가 보인다.

## 범위 밖
- 로그인/회원가입, 페이지네이션, 검색, 첨부파일.
