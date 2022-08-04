import { Link } from "react-router-dom"
import { ReactComponent as DeleteIcon } from '../../src/assets/svg/deleteIcon.svg'
import BedIcon from '../../src/assets/svg/bedIcon.svg'
import BathtubIcon from '../../src/assets/svg/bathtubIcon.svg'

function ListingItem({listing, id, onDelete}) {

  return (
    <li className="categoryListing">
        <Link 
            to={`/category/${listing.type}/${id}`} 
            className='categoryListingLink'
        >
            <img 
                src={listing.imageUrls[0]} 
                alt={listing.name} 
                className='categoryListingImg'
            />
            <div className="categoryListingDetails">
                <p className="categoryListingLocation">{listing.location}</p>
                <p className="categoryListingName">{listing.name}</p>
                <p className="categoryListingPrice">
                    ${listing.offer 
                    ? listing.discountedPrice
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    : listing.regularPrice
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    }
                    {listing.type === 'rent' && ' per Month'}
                </p>
                <div className="categoryListingInfoDiv">
                    <img src={BedIcon} alt="bed" />
                    <p className="categoryListingInfoText">{listing.bedrooms}
                        { 
                            listing.bedrooms > 1 ? ' Bedrooms' : ' Bedroom'
                        }
                    </p>
                    <img src={BathtubIcon} alt="bathroom" />
                    <p className="categoryListingInfoText">{listing.bathrooms}
                        { 
                            listing.bathrooms > 1 ? ' Bathrooms' : ' Bathroom'
                        }
                    </p>
                </div>
            </div>
        </Link>
        
        {onDelete && (
            <DeleteIcon 
            className="removeIcon" 
            fill="rgb(231,76,60)"
            onClick={() => onDelete(listing.id, listing.name)}/>
        )}
    </li>
  )
}

export default ListingItem