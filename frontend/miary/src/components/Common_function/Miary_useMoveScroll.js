/**
 * @author Shun
 * @email vytngms@gmail.com
 * @create date 2022-09-02 09:53:35
 * @modify date 2022-09-02 10:11:54
 * @desc [마이어리에서 사용하는 Custom Hook]
 */
import {useRef} from 'react';

//해당 태그를 가진놈으로 스크롤하는 Custom Hook.
export const useMoveScroll = ()=>{
    const element = useRef<HTMLDivElement>(null);
    const onMoveToElement = ()=>{
        element.current?.scrollIntoView({behavior: "smooth", block: 'start'});
    };
    return {element, onMoveToElement};
}

export default useMoveScroll;