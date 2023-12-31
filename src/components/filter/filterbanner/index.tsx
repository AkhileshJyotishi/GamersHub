import clsx from "clsx"

const BannerComponent = ({
  className,
  bannerText,
  bannerTitle,
}: {
  className?: string
  bannerText?: JSX.Element
  bannerTitle: JSX.Element
}) => {
  return (
    <>
      <div className={clsx(className)}>
        <h1 className="font-bold text-[36px] px-2">{bannerTitle}</h1>
        <div className="mt-[25px] text-[18px] px-4 text-user_interface_6 ">{bannerText}</div>
      </div>
    </>
  )
}

export default BannerComponent
