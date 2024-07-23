import { useState, useMemo, useEffect } from 'react'
import { debounce } from 'lodash'

export function useSearch(initialData = [], key1, key2) {
    const [search, setSearch] = useState('')
    const [searchResult, setSearchResult] = useState(initialData)

    useEffect(() => {
        setSearchResult(initialData)
    }, [initialData])

    const handleSearch = (text) => {
        if (text) {
            setSearch(text)
            let newArray = []
            if (key2) {
                newArray = initialData?.filter((x) => `${x[key1]} ${x[key2]}`?.toLowerCase()?.includes(text?.toLowerCase()))
            } else {
                newArray = initialData?.filter((x) => x[key1]?.toLowerCase()?.includes(text?.toLowerCase()))
            }
            setSearchResult(newArray)
        } else {
            setSearch('')
            setSearchResult(initialData)
        }
    }
    // const handleSearch = debounce((text) => {
    //     if (text) {
    //         setSearch(text)
    //         let newArray = []
    //         if (key2) {
    //             newArray = initialData?.filter((x) => `${x[key1]} ${x[key2]}`?.toLowerCase()?.includes(text?.toLowerCase()))
    //         } else {
    //             newArray = initialData?.filter((x) => x[key1]?.toLowerCase()?.includes(text?.toLowerCase()))
    //         }
    //         setSearchResult(newArray)
    //     } else {
    //         setSearch('')
    //         setSearchResult(initialData)
    //     }
    // }, 5)

    const memorizedResult = useMemo(() => searchResult, [searchResult])

    return [memorizedResult, { search, handleSearch }]
}
