# 미니 방명록 (Guestbook)

Next.js(App Router) + TypeScript + Neon Postgres 기반 방명록. 회원가입/로그인
없이 누구나 이름·메시지·비밀번호로 글을 남기고, 같은 비밀번호로만 자기 글을
수정·삭제할 수 있다.

SDD 흐름(`/grill-with-docs` → `/to-spec` → `/to-tickets` → `/implement` →
`/code-review`) 참고 문서:
- [CONTEXT.md](CONTEXT.md) — 용어집
- [docs/adr/0001](docs/adr/0001-per-entry-password-no-accounts.md) — 계정 없이 글 단위 비밀번호로 권한 증명하는 이유
- [specs/guestbook-mvp.md](specs/guestbook-mvp.md) — 스펙
- [specs/guestbook-mvp-tickets.md](specs/guestbook-mvp-tickets.md) — 티켓

## 기능
- Create: 이름 + 메시지 + 비밀번호(4자 이상)로 작성
- Read: 최신순 전체 목록
- Update/Delete: 비밀번호 일치해야만 가능, 틀리면 화면에 에러 표시
- 비밀번호는 `crypto.scrypt`로 해시해 저장 (평문 저장 안 함)
- 화면 하단에 개발자 이름·학번 표시 (`lib/config.ts`)

## 실행 방법
1. Neon Postgres 프로젝트 생성, Connection String 복사
2. `.env.local` 생성 (`.env.local.example` 참고):
   ```
   DATABASE_URL=postgresql://...
   ```
3. `npm install`
4. 테이블 생성: `npm run db:schema` (또는 `db/schema.sql`을 Neon SQL Editor에서 직접 실행)
5. `npm run dev` → http://localhost:3000

## 검증 스크립트
서버를 띄운 상태에서: 작성 → 조회 → 틀린 비밀번호 수정(403) → 올바른
비밀번호 수정 → 틀린 비밀번호 삭제(403) → 올바른 비밀번호 삭제까지
자동 확인.
```
node scripts/smoke-test.mjs
```
배포본을 검사하려면 `BASE_URL=https://<배포주소> node scripts/smoke-test.mjs`.
