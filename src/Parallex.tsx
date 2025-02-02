import { useEffect, useRef, useState, useCallback } from "react";
import bg from "./assets/bg.jpg";
import moon from "./assets/moon.png";
import road from "./assets/road.png";
import hook from "./assets/hook.png";
import "./style.css";
import popper from "./assets/popper.gif";
import arrow from "./assets/arrow.gif";
import UseMemoDemo from "./UseMemoDemo";
import signature from "./assets/signature.png";
console.log(arrow);
console.log(popper);

interface ParallaxElements {
  bg: HTMLImageElement | null;
  moon: HTMLImageElement | null;
  road: HTMLImageElement | null;
  text: HTMLHeadingElement | null;
}

const ParallaxEffect = () => {
  const elementsRef = useRef<ParallaxElements>({
    bg: null,
    moon: null,
    road: null,
    text: null,
  });

  const hiddenTextRef = useRef<HTMLHeadingElement>(null);
  const commentInputRef = useRef<HTMLInputElement>(null);
  const [popperVisible, setPopperVisible] = useState<boolean>(true);
  const demoRef = useRef<HTMLInputElement>(null);

  const [visible, setVisible] = useState(false);
  const [desVisible, setDesVisible] = useState(false);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState<string[]>([]);
  const [commentText, setCommentText] = useState("");

  const handleBoxClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    setPopperVisible(false);
    const box = e.currentTarget;
    box.style.transform = `translateX(-300%)`;
    box.style.transition = "transform 1.5s ease-in-out";
    setVisible(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollValue = window.scrollY;

      if (elementsRef.current.bg)
        elementsRef.current.bg.style.top = `${scrollValue * 0.5}px`;
      if (elementsRef.current.moon)
        elementsRef.current.moon.style.left = `${-scrollValue * 0.5}px`;
      if (elementsRef.current.road)
        elementsRef.current.road.style.top = `${scrollValue * 0.15}px`;
      if (elementsRef.current.text)
        elementsRef.current.text.style.top = `${scrollValue}px`;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (hiddenTextRef.current) {
            hiddenTextRef.current.classList.toggle(
              "visible",
              entry.isIntersecting
            );
          }
        });
      },
      { threshold: 0.5 }
    );

    if (hiddenTextRef.current) observer.observe(hiddenTextRef.current);

    return () => {
      if (hiddenTextRef.current) observer.unobserve(hiddenTextRef.current);
    };
  }, []);

  const handleLike = useCallback(() => setLikes((prev) => prev + 1), []);

  const handleComment = useCallback(() => {
    if (commentInputRef.current?.value.trim()) {
      setComments((prev) => [...prev, commentInputRef.current.value.trim()]);
    }
  }, []);

  console.log(commentInputRef);
  console.log(commentInputRef.current);

  const [isClosing, setIsClosing] = useState<boolean>(false);

  const handleClose = (e) => {
    e.stopPropagation();
    setIsClosing(true);
    setTimeout(() => {
      setDesVisible(false);
      setIsClosing(false);
    }, 1000);
  };

  console.log(comments);

  return (
    <>
      <div className="parallax-container">
        <section className="parallax-section">
          <img
            ref={(el) => (elementsRef.current.bg = el)}
            src={bg}
            alt="background"
            className="parallax-bg"
          />
          <img
            ref={(el) => (elementsRef.current.moon = el)}
            src={hook}
            alt="moon"
            className="parallax-moon"
          />
          <img
            ref={(el) => (elementsRef.current.road = el)}
            src={road}
            alt="road"
            className="parallax-road"
          />
          <h2 className="Parallax-box-text">Your return Value</h2>
          <h2
            ref={(el) => (elementsRef.current.text = el)}
            className="parallax-text"
          >
            Count=2;
          </h2>
        </section>
        <div className="box-container">
          {popperVisible && (
            <div className="gif-box1">
              <img src={popper} alt="Animated GIF" className="background-gif" />
            </div>
          )}
          <div className="box" onClick={handleBoxClick}>
            <h2 className="hidden-text" ref={hiddenTextRef}>
              Count=2;
            </h2>
            <h2 className="typing-animation">is Memoized!</h2>
          </div>

          {visible && (
            <>
              <div
                className="next-box"
                onClick={() => demoRef.current?.scrollIntoView()}
              >
                <h2 className="box-text">Using useMemo Hook!</h2>
              </div>

              <div className="arrow">
                <img
                  src={arrow}
                  alt="Animated GIF"
                  className="background-gif"
                />
              </div>
              <div ref={demoRef} className="demo">
                {" "}
                <UseMemoDemo />
              </div>
            </>
          )}
          {popperVisible && (
            <div className="gif-box2">
              <img src={popper} alt="Animated GIF" className="background-gif" />
            </div>
          )}
        </div>
        <button className="blog-button" onClick={() => setDesVisible(true)}>
          Blog
        </button>
      </div>

      {desVisible && (
        <div
          className={`maindiv ${isClosing ? "exit" : ""}`}
          onClick={handleClose}
        >
          <div className={`description ${isClosing ? "exit" : ""}`}>
            <p>
              The `useMemo` hook in React is a useful tool for speed
              optimization because it ensures that expensive computations are
              only repeated when necessary by memoizing the result of a
              calculation. It needs two inputs: a function that returns the
              calculated result and a dependency array that specifies when the
              function should run again. If none of the dependencies change,
              React returns the previously saved result instead of recalculating
              it. This is especially useful for accelerating slow operations
              such as filtering large lists, doing complex calculations, or
              generating derived state from state or props. For example, when
              creating a list with sorting or filtering based on user input,
              `useMemo` ensures that the sorting logic doesn't run on each
              render until the dependencies change.{" "}
            </p>
            <h2>Why Use useMemo? </h2>

            <p>
              In React, every time a component re-renders, all variables and
              functions inside it are recreated. This can lead to performance
              issues, especially when dealing with expensive computations or
              derived state. The useMemo hook helps by memoizing (caching) the
              result of a function so that it is not recalculated on every
              render unless its dependencies change. This improves efficiency,
              prevents unnecessary calculations, and reduces the workload on the
              browser, leading to a smoother user experience.
            </p>

            <h2>Advantages of useMemo</h2>
            <p>⭐️ Performance Optimization</p>
            <p>⭐️ Efficient Rendering</p>
            <p>⭐️ Stabilizing References</p>

            <h3>Author: Priyanka Manwani</h3>
            {/* <h4>2nd Feburary 2025</h4> */}
            <img src={signature} alt="" className="sign" />
          </div>
        </div>
      )}

      <div className="comment-section">
        <button className="like-btn" onClick={handleLike}>
          🤍 {likes}
        </button>

        <div className="comment-box">
          <input
            ref={commentInputRef}
            type="text"
            placeholder="Add a comment..."
          />
          <button className="comment-btn" onClick={handleComment}>
            Post
          </button>
          <div className="comments-list">
            {comments.map((comment, index) => (
              <p key={index} className="comment">
                {comment}
              </p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ParallaxEffect;
