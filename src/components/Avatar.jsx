const Avatar = ({ avatar }) => {
  return (
    <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
      <img src={avatar} />
    </div>
  )
}

export default Avatar;