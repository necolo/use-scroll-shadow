import { useEffect, useState } from 'react';
import { debounce } from './debounce';

/**
 * Add scroll shadow
 * @param wrapperRef the wrapper element ref
 * @param scrollContentRef the scrollable content ref
 */
export function useScrollShadow(
  wrapperRef: React.RefObject<HTMLElement | null>,
  scrollContentRef: React.RefObject<HTMLElement | null>,
) {
  const [onTop, setOnTop] = useState(true);
  const [onBottom, setOnBottom] = useState(false);

  const handleScroll = (ev: Event) => {
    const { scrollTop, scrollHeight, clientHeight } = ev.target as any;
    const buffer = 15;
    const hitTop = scrollTop < buffer;
    const hitBottom = (scrollTop > (scrollHeight - clientHeight) - buffer) || (scrollHeight === clientHeight);
    setOnTop(hitTop);
    setOnBottom(hitBottom);
  };

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const content = scrollContentRef.current;
    if (!wrapper || !content) {
      return;
    }
    wrapper.className += ' scroll-shadow-box';

    let height = content.clientHeight;

    const resizeObserver = new ResizeObserver(debounce(entries => {
      const entry = entries[0];
      const { clientHeight } = entry.target;
      if (clientHeight !== height) {
        height = clientHeight;
        handleScroll(entry);
      }
    }, 300));
    resizeObserver.observe(content);

    content.addEventListener('scroll', handleScroll);
    return () => content.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const content = scrollContentRef.current;
    if (!wrapper || !content) {
      return;
    }
    wrapper.style.setProperty('--shadow-top-opacity', onTop ? '0' : '1');
    wrapper.style.setProperty('--shadow-bottom-opacity', onBottom ? '0' : '1');
  }, [onTop, onBottom]);
}