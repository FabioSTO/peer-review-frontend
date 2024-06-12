import { useState } from 'react'
import '../css/topmenu.css'
import { useMenuContext } from '../context/MenuContext'

function TopMenu() {
  const [showMyReviews, setShowMyReviews] = useState(false)
  const [showMyTasks, setShowMyTasks] = useState(false)
  const [showMyOrganizations, setShowMyOrganizations] = useState(false)
  const [showMyProject, setShowMyProject] = useState(false)
  const { selectedTopMenu, setTopSelectedMenu, selectedProject } = useMenuContext();

  const handleShowMyReviews = (menuId) => {setShowMyReviews(!showMyReviews);
    setTopSelectedMenu(menuId)
  }
  const handleShowMyTasks = (menuId) => {setShowMyTasks(!showMyTasks)
    setTopSelectedMenu(menuId)
  }
  const handleShowMyOrganizations = (menuId) => {setShowMyOrganizations(!showMyOrganizations)
    setTopSelectedMenu(menuId)
  }
  const handleShowMyProject = (menuId) => {setShowMyProject(!showMyProject)
    setTopSelectedMenu(menuId)
  }

  return (
    <div className='topMenuContainer'>
      <div className='fillTopMenu'></div>
      <div className="topmenu">
        <div className='topmenuSection' id={`${selectedTopMenu === 'reviews' ? 'selected' : ''}`} onClick={() => handleShowMyReviews('reviews')}>My reviews</div>
        <div className='topmenuSection' id={`${selectedTopMenu === 'tasks' ? 'selected' : ''}`} onClick={() => handleShowMyTasks('tasks')}>My tasks</div>
        <div className='topmenuSection' id={`${selectedTopMenu === 'organizations' ? 'selected' : ''}`} onClick={() => handleShowMyOrganizations('organizations')}>My organizations</div>
        {selectedProject && <div className='topmenuSection' id={`${selectedTopMenu === 'project' ? 'selected' : ''}`} onClick={() => handleShowMyProject('project')}>{selectedProject ? selectedProject.proname : ''}</div>}
      </div>
      <div className='fillTopMenuRight'></div>
    </div>
    
  )
}

export default TopMenu;