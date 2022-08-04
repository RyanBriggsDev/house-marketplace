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
import ListingItem from '../Components/ListingItem'

function Offers() {

  const [listings, setListings] = useState(null)
  const [loading, setLoading] = useState(true)

  const params = useParams()
  
  useEffect(() => {
    const fetchListings = async () => {
        try {
            // Create a query - this is like setting a ? query for an api
            const q = query(
                collection(db, 'Listings'),
                where('offer', '==', true),
                limit(10)
                // orderBy('timestamp', 'desc')
            )

            // Execute/call query - this is like fetching a url with specific queries
            const querySnapshot = await getDocs(q)
            // Where the data will be held
            const listings = []
            // Loop through all the database data that's found and add it to listings array
            querySnapshot.forEach((doc) => {
                return listings.push({
                    id: doc.id,
                    data: doc.data(),
                })
            })

            setListings(listings)
            setLoading(false)
        } catch (error) {
            toast.error('Failed to find listings')
        }
    }
    fetchListings()
  }, [])

  return (
        <div className='category'>
            <header>
                <p className="pageHeader">Offers</p>
            </header>
            {
            loading ? <Spinner /> : listings && listings.length > 0 ? 
            (
                <main>
                    <ul className="categoryListings">
                        {listings.map((listing) => (
                            <ListingItem listing={listing.data} id={listing.id} key={listing.id}/>
                        ))}
                    </ul>
                </main>
            )
            : <p>No properties are currently on offer</p>
            }
        </div>
      )
    }
export default Offers