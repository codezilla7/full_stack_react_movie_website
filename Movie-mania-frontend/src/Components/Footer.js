import React from 'react'

export default function Footer() {
  return (
    <div className='footer-div'>
      <p className='footer-left'>Movie Mania <i class="bi bi-c-circle"></i> 2023 All rights Reserved.</p>
      <div className='footer-icons-div'>
      <a href='https://web.facebook.com/profile.php?id=100016664357793' className='footer-right facebook' target='_blank' ><i class="bi bi-facebook"></i></a>
      <a href='https://www.instagram.com/mustafa_nazari7/?fbclid=IwAR1t5fA91zgTM9S3Jpp_TOZjmMINxdhhWaa6wcOJVouDXPzmpJBeuEZqdk4' className='footer-right mx-2 insta' target='_blank' ><i class="bi bi-instagram"></i></a>
      <a href='https://twitter.com/Mustafa_nazari7' className='footer-right twitter' target='_blank' ><i class="bi bi-twitter"></i></a>
      </div>
    </div>
  )
}
