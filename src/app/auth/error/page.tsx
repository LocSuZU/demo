'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation'

export default function CustomErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  let component = null
  switch (error) {
    case 'OAuthAccountNotLinkedError':
      component =
        <>
          <p>Email has register by google or facebook</p>
          <Link href="/model">Cập nhật mật khẩu</Link>
        </>
      break;
    case 'InvalidPassword':
      component =
        <>
          <p>Password Invalid</p>
        </>
    default:
      component = <p>Unknown error</p>
      break;
  }
  return (
    <div>
      <h1>An error occurred</h1>
      {component}
    </div>
  )
}