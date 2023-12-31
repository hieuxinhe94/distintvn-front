"use client"

import { useFeaturedProductsQuery } from "@lib/hooks/use-layout-data"
import UnderlineLink from "@modules/common/components/underline-link"
import ProductPreview from "@modules/products/components/product-preview"
import SkeletonProductPreview from "@modules/skeletons/components/skeleton-product-preview"

const SellbyPartnerProducts = () => {
  const { data } = useFeaturedProductsQuery()

  return (
    <div className="py-12 bg-indigo-100">
      <div className="content-container py-2">
        <div className="flex flex-col items-center text-center mb-16">
          {/* <span className="text-base-regular text-gray-600 mb-6">
            Các thiết kế recommend theo từng sở thích khách hàng
          </span> */}
          <p className="text-2xl-regular text-gray-900 max-w-lg mb-4">
            Được thiết kế và bán bởi những khách hàng thời thượng.
          </p>
          <UnderlineLink href="/store">Xem tất cả</UnderlineLink>
        </div>
        <ul className="grid grid-cols-2 small:grid-cols-6 gap-x-4 gap-y-8">
          {data
            ? data.map((product) => (
                <li key={product.id}>
                  <ProductPreview {...product} />
                </li>
              ))
            : Array.from(Array(4).keys()).map((i) => (
                <li key={i}>
                  <SkeletonProductPreview />
                </li>
              ))}
        </ul>
      </div>
    </div>
  )
}

export default SellbyPartnerProducts
