"use client"

import UnderlineLink from "@modules/common/components/underline-link"
import Image from "next/image"
import React, { useRef } from "react"

const Hero = () => {
  const ref = useRef(null)
  React.useEffect(() => {
    import("@lottiefiles/lottie-player")
  })

  return (
    <div className="h-[90vh] w-full relative bg-indigo-800/90">
      <div className="text-white absolute inset-0 z-10 flex flex-col justify-center items-center text-center small:text-left small:justify-end small:items-start small:p-48">
        <a
          className="mb-18 hidden md:inline-block rounded-full border border-[#CAD4D7] px-7 py-[0.65rem] hover:border-[#A8B1B4]"
          type="button"
          href="#/video/hilyyrqf0m"
        >
          <span className="mr-2 inline-block border-y-[6px] border-l-[6px] border-r-0 border-solid border-y-transparent border-l-black"></span>
          Xem video hướng dẫn dài 2 phút
        </a>

        <div className="h-24 w-1" />
        <div className="text-3xl-semi w-[500px] mb-4 drop-shadow-md shadow-black uppercase">
          Cuộc sống của tôi -
          <div
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgb(96, 116, 213), rgb(20, 88, 133) 45.31%, rgb(64, 19, 197));",
            }}
          >
            Phong cách riêng tôi.
          </div>
        </div>
        <p className="text-base-regular max-w-[32rem] mt-12 mb-6 drop-shadow-md shadow-black">
          Công cụ thiết kế và sản xuất tự động hóa của chúng tôi mang tới những
          sản phẩm tự thiết kế đến tay bạn trong chỉ 6 tiếng.
        </p>
        <div className="flex">
          <UnderlineLink href="/store">Tùy chỉnh thiết kế</UnderlineLink>
          <div className="w-6"></div>
          <UnderlineLink href="/store">Mẫu bán chạy</UnderlineLink>
        </div>
      </div>

      <div className="w-full h-full flex justify-end">
        <div className="mx-96 py-32">
          <lottie-player
            id="firstLottie"
            ref={ref}
            autoplay
            mode="normal"
            src="./json.json"
            style={{ width: "500px", height: "500px" }}
          ></lottie-player>
        </div>
      </div>
    </div>
  )
}

export default Hero
