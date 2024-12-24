import '../css/loginform.css';
import { useState, useEffect } from 'react';
import { useUserContext } from '../context/UserContext';
import { getOrganizations } from '../hooks/getOrganizations';
import { getProjectsByOrg } from '../hooks/getProjectsByOrg';
import { getTasksByPro } from '../hooks/getTasksByPro';
import { addReview } from '../hooks/addReview';
import '../css/newreview.css'
import Alert from './Alert';
import "diff2html/bundles/css/diff2html.min.css";
import { getRepositories } from '../hooks/getRepositories';
import { LightAsync as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/hljs';
const Diff2Html = require('diff2html');

const NewReview = ({ setSelectedOptionMenu }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [organizations, setOrganizations] = useState([]);
  const [organization, setOrganization] = useState(null);
  const [projects, setProjects] = useState([]);
  const [ selectedOption, setSelectedOption ] = useState("task");
  const [ selectedContentOption, setSelectedContentOption ] = useState(null);
  const [ commits, setCommits ] = useState(null);
  const [ selectedRepository, setSelectedRepository ] = useState(null);
  const [ selectedBranch, setSelectedBranch ] = useState(null);
  const [ selectedCommit, setSelectedCommit ] = useState(null);
  const [ commitInfo, setCommitInfo ] = useState(null);
  const [ showCommitFiles, setShowCommitFiles ] = useState(false);
  const [ title, setTitle ] = useState(null);
  const [ desc, setDesc ] = useState(null);
  const [tags, setTags] = useState([]);
  const [ tasks, setTasks ] = useState([]);
  const [ selectedTask, setSelectedTask ] = useState(null);
  const [ tagValue, setTagValue ] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [showedImage, setShowedImage] = useState(null);
  const [showAlert, setShowAlert] = useState({show: false, message: ''});

  const [inputValue, setInputValue] = useState("");

  // Para el diff manual

  const [inputValue1, setInputValue1] = useState("");
  const [inputValue2, setInputValue2] = useState("");

  
  const { memberAccounts, userID, activeMemberAccount } = useUserContext();

  //////////////////// Tengo el memberAccounts[0] porque aun no hice lo de elegir cuenta

  const handleGetRepositories = async () => {
    setLoading(true);  // Activar el spinner antes de iniciar la carga
    setError(null);    // Limpiar cualquier error previo
    try {
      const commits = await getRepositories(activeMemberAccount);
      setCommits(commits);
      console.log(commits);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);  // Desactivar el spinner después de que finalice la operación
    }
  };

  const handleRepositoryChange = (e) => {
    const selectedRepoName = e.target.value;

    const selectedRepoData = commits.find(commit => commit.repoName === selectedRepoName);
    setSelectedRepository(selectedRepoData);
    setSelectedBranch(null);
    setSelectedCommit(null);
  }

  const handleBranchChange = (e) => {
    const selectedBranchName = e.target.value;

    const selectedBranchData = (selectedRepository.branches).find(branch => branch.branchName === selectedBranchName);
    setSelectedBranch(selectedBranchData);
    setSelectedCommit(null);
  }

  const handleCommitChange = (e) => {
    const selectedCommitName = e.target.value;

    const selectedCommitData = (selectedBranch.commits).find(commit => commit.message === selectedCommitName);

    console.log(selectedCommitData)

    setSelectedCommit(selectedCommitData);
  }

  const handleFileSelected = (file) => {

    const filename = file.filename;
    const patch = file.patch;

    const diffText = `Index: ${filename}\n===================================================================\n--- ${filename}\n+++ ${filename}\n ` + patch;

    const outputHtml = Diff2Html.html(diffText, { 
    fileListToggle: false,
    fileListStartVisible: false,
    fileContentToggle: false,
    matching: "lines",
    outputFormat: "side-by-side",
    synchronisedScroll: true,
    highlight: true,
    colorScheme: "dark" });
    
    console.log(selectedCommit)
    setCommitInfo(outputHtml);
  }

  const getOptionClassName = (option) => {
    return selectedOption === option ? 'scopeOption selected' : 'scopeOption';
  };

  const getContentOptionClassName = (option) => {
    return selectedContentOption === option ? 'reviewOption selected' : 'reviewOption';
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInput1Change = (event) => {
    setInputValue1(event.target.value);
  };

  const handleInput2Change = (event) => {
    setInputValue2(event.target.value);
  };

  const handleTagChange = (e) => {
    let value = e.target.value;

    // Agrega un "#" al inicio
    if (value && value.charAt(0) !== '#') {
      value = '#' + value;
    } 

    setTagValue(value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  const handleAddTagPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const newTag = e.target.value;
      setTagValue("")
      setTags([...tags, newTag]);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(file);
      setShowedImage(imageUrl);
    }
  };

  const handleOrgChange = async (event) => {
    setOrganization(event.target.value);
    const projects = await getProjectsByOrg(event.target.value);

    const uniqueProjects = projects.reduce((acc, project) => {
      if (!acc.some(p => p.proname === project.proname)) {
        acc.push(project);
      }
      return acc;
    }, []);

    setProjects(uniqueProjects);
  };

  const handleProChange = async (event) => {
    const tasks = await getTasksByPro(event.target.value);
    setTasks(tasks);
  };

  const handleTaskChange = async (event) => {
    setSelectedTask(event.target.value);
  };

  useEffect(() => {
      const fetchData = async () => {
        try {
          const organizations = await getOrganizations(userID);
          setOrganizations(organizations);
          console.log(organizations)
        } catch (error) {
          console.error(error.message);
        }
      };
  
      fetchData();
  }, []);

  const handleCreateReview = async (e) => {
    e.preventDefault();
    try {
      let reviewContent = null;
      if (selectedContentOption === "code") {
        reviewContent = inputValue;
      } else if (selectedContentOption === "diff") {
        reviewContent = inputValue1 + "_-#CapeerSpecialSeparator#-_" + inputValue2;
      } else if (selectedContentOption === "commit") {
        reviewContent = commitInfo;
      }
      await addReview( selectedTask, title, desc,  selectedOption, tags, selectedImage, reviewContent, selectedContentOption, activeMemberAccount, organization);
      setShowAlert({ show:true, message:"¡Roles guardados con éxito!" });
      setTimeout(() => {
        setShowAlert((prevAlertInfo) => ({ ...prevAlertInfo, show: false }));
      }, 4000);
      setSelectedOptionMenu("submissions");
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className='newReviewContainer' style={{ width: '80vw' }}>
      {showAlert.show && <Alert message={showAlert.message}/>}
        <div style={{ width: '100%', height: '2px', backgroundColor: 'rgb(26, 15, 83)', margin: '20px 0' }}></div>

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
        <h3 style={{ textAlign: 'center' }} id='title'>Create new submission for </h3>

        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '20px', marginBottom: '30px'}}>
          <select className='inputFormRev custom-select' id="select" list="organizations" placeholder='Organizations' onChange={handleOrgChange} required>
            {organizations.length > 0 ? (
              <>
                <option value="">Select organization </option>
                {organizations
                  .map((organization, index) => (
                  <option key={index} id='option' value={organization.orgname}>{organization.orgname}</option>
                ))}
              </>
            ) : (
              <option value="" disabled>No organizations available</option>
            )}
            </select>

            <select className='inputFormRev custom-select' id="select" list="projects" placeholder='Projects' onChange={handleProChange} required>
            {projects.length > 0 ? (
              <>
                <option value="">Select project </option>
                {projects
                  .map((project, index) => (
                  <option key={index} id='option' value={project.proname}>{project.proname}</option>
                ))}
              </>
            ) : (
              <option value="" disabled>No projects available</option>
            )}
            </select>

            <select className='inputFormRev custom-select' id="select" list="tasks" placeholder='Tasks' onChange={handleTaskChange} required>
            {tasks.length > 0 ? (
              <>
                <option value="">Select Task </option>
                {tasks
                  .map((task, index) => (
                  <option key={index} id='option' value={task.task_ID}>{task.taskname}</option>
                ))}
              </>
            ) : (
              <option value="" disabled>No tasks available</option>
            )}
            </select>
          </div>
        </div>

        <div style={{ width: '55%', margin: 'auto', height: '2px', backgroundColor: 'rgb(26, 15, 83)', marginTop: '20px', marginBottom: '20px'}}></div>
          
        <form id='form'>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '40px'}}>
              <div style={{ display: 'flex', flexDirection: 'column', width: '250px'}}>
                <h4>Submission title</h4>
                <input style={{marginLeft: '0px'}} type='text' placeholder='Name' className='inputForm' id='name' value={title} onChange={e => setTitle(e.target.value)} required/>
              </div>  
              <div style={{ display: 'flex', flexDirection: 'column'}}>
                <h4>Tags</h4>
                <div id='tagsDiv'>
                  <input style={{marginLeft: '0px'}} className='inputForm' id="tagsListInput" list="tags" placeholder='Tags' value={tagValue} onChange={handleTagChange} onKeyDown={handleAddTagPress}/>
                  <datalist id="tags">
                    <option value="#JavaScript"/>
                    <option value="#Java"/>
                    <option value="#MySQL"/>
                    <option value="#Python"/> 
                    <option value="#Photoshop"/>
                  </datalist> 
                  {tags.length > 0 && 
                  <ul className='tagsEnteredList'>
                    {tags.map((tag, index) => (
                      <li key={index} className='tagsEntered'>{tag}</li>
                    ))}
                  </ul>
                  }
                </div>
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', width: '500px', margin: 'auto' }}>
              <h4>Submission desc </h4>
              <textarea style={{ height: '80px', marginLeft: '0px'}} placeholder='Description' className='inputForm' id='description' value={desc} onChange={e => setDesc(e.target.value)} required/>
            </div> 
            
          </div>
          
          <div style={{ width: '55%', margin: 'auto', height: '2px', backgroundColor: 'rgb(26, 15, 83)', marginTop: '20px', marginBottom: '20px'}}></div>
          <h4 style={{ textAlign: 'center', marginBottom: '0' }}>Submission content</h4>
          <div className='contentOptionsContainer' style={{ justifyContent: 'center' }}>
            <h4 id='reviewOption' className={getContentOptionClassName("commit")} onClick={() => {handleGetRepositories(); setSelectedContentOption("commit")}}>GitHub commits</h4>
            <h4 id='reviewOption' className={getContentOptionClassName("diff")} onClick={() => setSelectedContentOption("diff")}>Manual diff</h4>
            <h4 id='reviewOption' className={getContentOptionClassName("code")} onClick={() => setSelectedContentOption("code")}>Simple code</h4>
          </div>
          {loading && <div className="spinner"></div>}
          {selectedContentOption === "code" && 
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'start', gap: '30px' }}>
              <textarea
                value={inputValue}
                onChange={handleInputChange}
                rows="10"
                cols="50"
                placeholder="Escribe tu código aquí..."
                style={{ 
                fontFamily: 'monospace',
                fontSize: '16px',
                padding: '10px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                resize: 'vertical', // permite redimensionar verticalmente el textarea
                backgroundColor: '#e0e5ec',
                color: '#333', }}
              />
              <div style={{ width: '45vw', maxHeight: '500px', overflowY: 'auto', borderRadius: '10px', border: '2px solid lightGreen',
                resize: 'vertical', margin: 'auto',  }}>
                <SyntaxHighlighter language="javascript" style={darcula} showLineNumbers>
                  {inputValue}
                </SyntaxHighlighter>
              </div>
            </div>
          }
          {selectedContentOption === "diff" && 
            <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px' }}>
                <textarea
                  value={inputValue1}
                  onChange={handleInput1Change}
                  rows="10"
                  cols="50"
                  placeholder="Escribe tu código aquí..."
                  style={{ marginBottom: '20px',
                  fontFamily: 'monospace',
                  fontSize: '16px',
                  padding: '10px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                  resize: 'vertical', // permite redimensionar verticalmente el textarea
                  backgroundColor: '#e0e5ec',
                  color: '#333', }}
                />
                <div style={{ width: '37vw', maxHeight: '500px', overflowY: 'auto', borderRadius: '10px', border: '2px solid #dc343c',
                  resize: 'vertical', margin: 'auto',  }}>
                  <SyntaxHighlighter language="javascript" style={darcula} showLineNumbers>
                    {inputValue1}
                  </SyntaxHighlighter>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px' }}>
                <textarea
                  value={inputValue2}
                  onChange={handleInput2Change}
                  rows="10"
                  cols="50"
                  placeholder="Escribe tu código aquí..."
                  style={{ marginBottom: '20px',
                  fontFamily: 'monospace',
                  fontSize: '16px',
                  padding: '10px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                  resize: 'vertical', // permite redimensionar verticalmente el textarea
                  backgroundColor: '#e0e5ec',
                  color: '#333', }}
                />
                <div style={{ width: '37vw', maxHeight: '500px', overflowY: 'auto', borderRadius: '10px', border: '2px solid lightGreen',
                  resize: 'vertical', margin: 'auto',  }}>
                  <SyntaxHighlighter language="javascript" style={darcula} showLineNumbers>
                    {inputValue2}
                  </SyntaxHighlighter>
                </div>
              </div>
            </div>
          }
          {commits && selectedContentOption === "commit" && 
            <div className='referencesContainer' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '5px'}}>
              <select className='inputFormRev custom-select' list="repositories" placeholder='Repositories' onChange={handleRepositoryChange}>
                <option value="">Choose a repository</option>
                {commits.map((commit, index) => {
                  return <option key={index} value={commit.repoName}>{commit.repoName}</option>
                })}
              </select>
              <select className='inputFormRev custom-select' list="branches" placeholder='Branches' onChange={handleBranchChange} disabled={!selectedRepository}>
                <option value="">Choose a branch</option>
                {selectedRepository && (selectedRepository.branches).map((branch, index) => {
                  return <option key={index} value={branch.branchName}>{branch.branchName}</option>
                })}
              </select>
              <select className='inputFormRev custom-select' list="commits" placeholder='Commits' onChange={handleCommitChange} disabled={!selectedBranch}>
                <option value="">Choose a commit</option>
                {selectedBranch && (selectedBranch.commits).map((commit, index) => {
                  return <option key={index} value={commit.message}>{commit.message}</option>
                })}
              </select>
              <button className='reviewOption' style={{fontSize: 'medium', backgroundColor: 'rgb(63, 43, 161)'}} type="button" onClick={() => setShowCommitFiles(true)}>Select this commit</button>
            </div>
          }
          {selectedContentOption === "commit" && showCommitFiles && 
            <div className='commitDiffsContainer'>
              <div className='commitFilesContainer'>
                {(selectedCommit.files).map((file, index) => {
                  return <h5 className='reviewOption' style={{fontSize: 'small', backgroundColor: 'rgb(63, 83, 161)', padding: '10px', marginTop: '0px'}} key={index} onClick={() => handleFileSelected(file)}>{file.filename}</h5>
                })}
              </div>
              <div className='commitFilesContainerContent'>
                <div dangerouslySetInnerHTML={{ __html: commitInfo }} />
              </div>
            </div>
          }
          <div style={{ width: '55%', margin: 'auto', height: '2px', backgroundColor: 'rgb(26, 15, 83)', marginTop: '20px', marginBottom: '40px'}}></div>

          <div className="image-uploader">
            <input
              type="file"
              accept="image/*"
              id="file-input"
              onChange={handleImageChange} disabled
            />
            <label htmlFor="file-input" className="custom-file-upload">
            Choose File
            </label>
            {selectedImage && (
              <div className="image-preview">
                <img src={showedImage} alt="Selected" />
              </div>
            )}
          </div>

          

          <h4 style={{textAlign: 'center'}}>Scope: </h4>
          <div className='scope'>
            <h4 id='scopeOptionLeft' className={getOptionClassName("task")} onClick={() => setSelectedOption("task")}>Task</h4>
            <h4 id='scopeOptionRight' className={getOptionClassName("project")} onClick={() => setSelectedOption("project")}>Project</h4>
          </div>

          <div style={{ width: '55%', margin: 'auto', height: '2px', backgroundColor: 'rgb(26, 15, 83)', marginTop: '40px', marginBottom: '20px'}}></div>
          
          {error && <div className="error-message" id='errorText'>{error}</div>}
          <div className="buttonContainer">
            <button
              style={{ marginTop: '30px' }}
              className="botonRegister"
              id="newReviewButton"
              onClick={handleCreateReview}
            >
              Create
            </button>
          </div>
        </form>
      </div>
  )
}

export default NewReview;