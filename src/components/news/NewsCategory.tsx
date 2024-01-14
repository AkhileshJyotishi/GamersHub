import { useState, useRef, MutableRefObject } from "react"
import a from "./news.module.css"
const data = {
  description: "A list of fruits.",
  fruits: [
    "apple",
    "apricot",
    "avocado",
    "banana",
    "bell pepper",
    "bilberry",
    "blackberry",
    "blackcurrant",
    "coconut",
    "cranberry",
    "cucumber",
    "currant",
    "damson",
    "date",
    "dragonfruit",
    "durian",
    "eggplant",
    "elderberry",
    "feijoa",
    "fig",
    "goji berry",
    "gooseberry",
    "grape",
    "grapefruit",
    "guava",
    "honeydew",
    "huckleberry",
    "jackfruit",
    "jambul",
    "jujube",
    "kiwi fruit",
    "kumquat",
    "lemon",
    "lime",
    "loquat",
    "lychee",
    "mandarine",
    "mango",
    "mulberry",
    "nectarine",
    "nut",
    "olive",
    "orange",
  ],
}

const Tag = ({ data }: Allow) => {
  return <li>{data}</li>
}

export default function NewsCategory() {
  let scrl: Allow = useRef(null)
  const [scrollX, setscrollX] = useState(0)
  const [scrolEnd, setscrolEnd] = useState(false)

  //Slide click
  const slide = (shift: Allow) => {
    scrl.current.scrollLeft += shift
    setscrollX(scrollX + shift)

    if (
      Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <= scrl.current.offsetWidth
    ) {
      setscrolEnd(true)
    } else {
      setscrolEnd(false)
    }
  }

  const scrollCheck = () => {
    setscrollX(scrl.current.scrollLeft)
    if (
      Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <= scrl.current.offsetWidth
    ) {
      setscrolEnd(true)
    } else {
      setscrolEnd(false)
    }
  }

  return (
    <div className={a.App}>
      {scrollX !== 0 && (
        <button className="prev" onClick={() => slide(-50)}>
          L
        </button>
      )}
      <ul ref={scrl} onScroll={scrollCheck}>
        {data.fruits.map((d, i) => (
          <Tag data={d} key={i} />
        ))}
      </ul>
      {!scrolEnd && (
        <button className="next" onClick={() => slide(+50)}>
          R
        </button>
      )}
    </div>
  )
}
