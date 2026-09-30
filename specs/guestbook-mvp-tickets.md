# Tickets: 미니 방명록 MVP

## TICKET 1 — 기반 설정 + 작성/조회
Blocked by: 없음
- `db/schema.sql`: `entries` 테이블
- `lib/db.ts`, `lib/password.ts`(scrypt 해시), `lib/entries.ts`
- `POST /api/entries`, `GET /api/entries`
- `/` : `NewEntryForm` + 목록(`EntryCard`, 최신순)

## TICKET 2 — 수정 (비밀번호 검증)
Blocked by: 1
- `PATCH /api/entries/[id]`: 비밀번호 불일치 403
- `EntryCard`의 "수정" 인라인 폼

## TICKET 3 — 삭제 (비밀번호 검증)
Blocked by: 1
- `DELETE /api/entries/[id]`: 비밀번호 불일치 403
- `EntryCard`의 "삭제" 인라인 폼

## TICKET 4 — 개발자 이름/학번 표시
Blocked by: 없음
- `lib/config.ts`, `components/SiteFooter.tsx`
