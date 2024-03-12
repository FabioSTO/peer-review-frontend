import { useState } from 'react'
import '../css/topmenu.css'
import { useMenuContext } from '../context/MenuContext'

function TopMenu() {
  const [showMyReviews, setShowMyReviews] = useState(false)
  const [showMySubmissions, setShowMySubmissions] = useState(false)
  const [showMyOrganizations, setShowMyOrganizations] = useState(false)
  const { selectedTopMenu, setTopSelectedMenu } = useMenuContext();

  const handleShowMyReviews = (menuId) => {setShowMyReviews(!showMyReviews);
    setTopSelectedMenu(menuId)
  }
  const handleShowMySubmissions = (menuId) => {setShowMySubmissions(!showMySubmissions)
    setTopSelectedMenu(menuId)
  }
  const handleShowMyOrganizations = (menuId) => {setShowMyOrganizations(!showMyOrganizations)
    setTopSelectedMenu(menuId)
  }

  return (
    <div className="topmenu">
      <div className='topmenuSection' id={`${selectedTopMenu === 'reviews' ? 'selected' : ''}`} onClick={() => handleShowMyReviews('reviews')}>My reviews</div>
      <div className='topmenuSection' id={`${selectedTopMenu === 'submissions' ? 'selected' : ''}`} onClick={() => handleShowMySubmissions('submissions')}>My submissions</div>
      <div className='topmenuSection' id={`${selectedTopMenu === 'organizations' ? 'selected' : ''}`} onClick={() => handleShowMyOrganizations('organizations')}>My organizations</div>
    </div>
  )
}

export default TopMenu;