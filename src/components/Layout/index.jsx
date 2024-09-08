import { Outlet, useNavigate } from "react-router-dom"
import { useAuth } from '../../utils/context'
import useSeason from "../../utils/hooks"
import { Menubar } from 'primereact/menubar'
import { InputText } from "primereact/inputtext"

export function Layout() {
  const saison = useSeason()
  const auth = useAuth()
  const navigate = useNavigate()
  const storedUser = localStorage.getItem('user')
  
  auth.user = (storedUser !== null) ? JSON.parse(storedUser) : ''

  const items = [
    {
      label: 'Accueil',
      icon: 'pi pi-fw pi-home',
      url: '/'
    },
    {
      label: 'Recettes',
      icon: '',
      items: [
        {
          label: 'Ajouter',
          icon: 'pi pi-fw pi-plus',
          url: '/protected/recette/add'
        },
        {
          label: 'Toutes les recettes',
          icon: 'pi pi-fw pi-list',
          url: '/protected/recettes/all'
        },
        {
          label: 'Recettes de saison',
          icon: 'pi pi-fw pi-heart',
          url: `/protected/recettes/${saison}`
        }
      ]
    }
  ]
  
  if (auth.user === '') {
    items.push({
      label:'Se connecter',
      icon: 'pi pi-fw pi-user',
      url: '/login'
    },
    {
      label: `S'enregistrer`,
      icon: 'pi pi-fw pi-user-plus',
      url: '/register'
    })
  } else {
    items.push({
      label: 'Mon compte',
      icon:'pi pi-fw pi-user',
      items: [
        {
          label: auth.user.user,
          icon: 'pi pi-fw pi-eye'
        },
        
        {
          label:'Se déconnecter',
          icon: 'pi pi-fw pi-power-off',
          command: () => {
            auth.signout(() => navigate("/"))
          }
        }
      ]
       
    })
  }

  const start = <img alt="logo" src="showcase/images/logo.png" onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} height="40" className="mr-2" />;
  const end = <InputText placeholder="Search" type="text" />;

  return (
    <div>
      <Menubar start={start} model={items} end={end} />
      <Outlet />
    </div>
  );
}
