import React, {useEffect} from 'react';
import styles from './Gallery.module.css';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {
    getLoading,
    getData,
    getPage,
    loadMore,
    loadData,
} from '../../app/reducers'

const Gallery = (props: any) => {
    const dispatch = useAppDispatch();
    const data = useAppSelector(getData)
    const page = useAppSelector(getPage)
    const loading = useAppSelector(getLoading)

    useEffect(() => {
        if(!props.fetched) {
            dispatch(loadData())
        }
    }, [page]);

    return (
        <div className={styles.Gallery}>
            <div className={styles.container}>
                {
                    !data.length?
                        loading?
                            (<p>Please, wait a sec</p>):
                            (<p>Nah, no photos :(</p>):
                        data.map(({url, id}:any, i:any) => {
                            return (
                                <img src={url}
                                     key={i}
                                     alt=""/>
                            )
                        })
                }
            </div>
            <button onClick={() => {
                dispatch(loadMore())
            }}>{loading? 'Loading...': 'Load more'}</button>
        </div>
    );
}

export default Gallery;
