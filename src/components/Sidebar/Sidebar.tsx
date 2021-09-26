import React, {useEffect} from 'react';
import styles from './Sidebar.module.css';
import {useAppDispatch, useAppSelector} from "../../app/hooks";

import {
    loadCategories,
    setCategory,
    getCategory,
    getCategories,
    loadData,
} from '../../app/reducers'

const Sidebar = (props: any) => {
    const dispatch = useAppDispatch();
    const category = useAppSelector(getCategory)
    const categories = useAppSelector(getCategories)

    useEffect(() => {
        if(!props.fetched) {
            dispatch(loadCategories())
        }
    }, []);

    return (
        <div className={styles.Sidebar}>
            <ul className={styles.categories}>
                {
                    categories.map(({name, id}, i) => (
                        <li className={id === category? styles.active: styles.passive}
                            key={i}
                            onClick={ () => {
                                dispatch(setCategory(id))
                                dispatch(loadData())
                            }
                            }>
                            { name }
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

export default Sidebar;
