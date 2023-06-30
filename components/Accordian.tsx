import { ReactNode, useEffect, useRef, useState } from "react";

interface Props {
  summary: ReactNode;
  children: ReactNode;
}

function Accordion({ summary, children }: Props) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    setContentHeight(contentRef?.current?.clientHeight ?? 0);
  }, []);

  return (
    <>
      <div className="accordion">
        <details>
          <summary>
            <span className="font-semibold">{summary}</span>
            <div className="arrow"></div>
          </summary>
        </details>
        <div className="content-wrapper">
          <div className="content" ref={contentRef}>
            {children}
          </div>
        </div>
      </div>

      <style jsx>{`
        .accordion {
          border-bottom: 1px solid #e5e8eb;
          padding: 20px 0;
          width: 100%;
        }

        details {
          cursor: pointer;
        }

        summary {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .content-wrapper {
          overflow: hidden;
        }

        .content {
          transition: 0.3s ease;
          margin-top: -${contentHeight}px;
          opacity: 0;
        }

        details[open] + .content-wrapper > .content {
          margin-top: 20px;
          opacity: 1;
        }

        .arrow {
          transition: transform 0.3s;
          width: 10px;
          height: 10px;
          border-top: 2px solid grey;
          border-right: 2px solid grey;
          transform: rotate(135deg);
        }

        details[open] .arrow {
          transform: rotate(315deg);
        }
      `}</style>
    </>
  );
}

export default Accordion;
