import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  doc,
} from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import Spinner from '../Components/Spinner'

function Category() {

  const [listings, setListings] = useState(null)
  const [loading, setLoading] = useState(true)

  const params = useParams()
  
  useEffect(() => {
    const fetchListings = async () => {
        try {
            const q = query(collection(db, 'Listings'), where('type', '==', 'rent'))
            const querySnapshot = await getDocs(q)
            const listings = []
            querySnapshot.forEach((doc) => {
                return listings.push({
                    id: doc.id,
                    data: doc.data(),
                })
            })
            setListings(listings)
            setLoading(false)
            console.log(listings);
        } catch (error) {
            toast.error('Failed to find listings')
        }
    }
    fetchListings()
  }, [])

  return (
        <div className='category'>
            <header>
                <p className="pageHeader">
                    {params.categoryName === 'rent' ? 'Places for rent' : 'Places for Sale'}    
                </p>
            </header>
            {
            loading ? <Spinner /> : listings && listings.length > 0 ? 
            (
                <main>
                    <ul className="categoryListings">
                        {listings.map((listing) => (
                            <h3>{listing.data.name}</h3>
                        ))}
                    </ul>
                </main>
            )
            : <p>No listings for {params.categoryName}</p>
            }
        </div>
      )
    }
export default Category