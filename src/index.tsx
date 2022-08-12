import { useEffect } from 'react';
import { debounce } from './debounce';

/**
 * Add scroll shadow
 *
 * @example
 * const { contentRef } = useScrollShadow();
 * <div>
 *  <div ref={contentRef} style={{ overflow: 'auto', height: '100vh' }}>
 *   ...
 *  </div>
 * </div>
 *
 * @return contentRef the scroll content element
 * @return wrapperRef at most time you don't have to set the wrapper, it will find the content element's parent
 */
export function useScrollShadow(deps: unknown[] = []) {
  const wrapperRef = useRef<any>(null);
  const contentRef = useRef<any>(null);

  const isOnTopRef = useRef(true);
  const isOnBottomRef = useRef(false);

  const onScroll = (ev: Event) => {
    const { scrollTop, scrollHeight, clientHeight } = ev.target as any;
    const buffer = 15;
    const hitTop = scrollTop < buffer;
    const hitBottom = (scrollTop > (scrollHeight - clientHeight) - buffer) || (scrollHeight === clientHeight);
    if (hitTop !== isOnTopRef.current) {
      isOnTopRef.current = hitTop;
      getWrapperElement()?.style.setProperty('--shadow-top-opacity', hitTop ? '0' : '1');
    }
    if (hitBottom !== isOnBottomRef.current) {
      isOnBottomRef.current = hitBottom;
      getWrapperElement()?.style.setProperty('--shadow-bottom-opacity', hitBottom ? '0' : '1');
    }
  };

  const getWrapperElement = () => {
    wrapperRef.current ||= contentRef.current?.parentElement;
    return wrapperRef.current;
  };

  useEffect(() => {
    const content = contentRef.current;
    const wrapper = getWrapperElement();
    if (!content || !wrapper) {
      return;
    }
    wrapper.className += ' scroll-shadow-box';

    const hitBottom = content.scrollTop > (content.scrollHeight - content.clientHeight - scrollBuffer) ||
    content.scrollHeight === content.clientHeight;

    isOnBottomRef.current = hitBottom;
    getWrapperElement()?.style.setProperty('--shadow-bottom-opacity', hitBottom ? '0' : '1');

    let height = content.clientHeight;

    const resizeObserver = new ResizeObserver(debounce(entries => {
      const entry = entries[0];
      const { clientHeight } = entry.target;
      if (clientHeight !== height) {
        height = clientHeight;
        onScroll(entry);
      }
    }, 300));
    resizeObserver.observe(content);

    content.addEventListener('scroll', onScroll);
    return () => content.removeEventListener('scroll', onScroll);
  }, deps);

  return { wrapperRef, contentRef };
}
