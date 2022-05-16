import { Button } from "primereact/button"


export function HomePage() {
  
  return (
    <div className="grid grid-nogutter surface-0 text-800">
      <div className="col-12 md:col-7 p-6 text-center md:text-left flex align-items-center ">
        <section>
          <div className="block text-5xl font-bold mb-1">Gérez facilement votre menu</div>
          <div className="text-5xl font-bold text-primary mb-3">et vos courses hebdomadaires</div>
          <p className="mt-0 mb-4 text-700 line-height-3">Générez aléatoirement votre menu à partir de notre base de recettes (que vous pouvez alimenter) et la liste de course associée à votre menu</p>

          <Button label="Plus d'infos" type="button" className="mr-3 p-button-help" />
          <Button label="Essayer"  type="button" className="p-button-primary" />
        </section>
      </div>
      <div className="col-12 md:col-5 overflow-hidden">
        <img src="https://www.primefaces.org/primeblocks-react/assets/images/blocks/hero/hero-1.png" alt="hero-1" className="md:ml-auto block md:h-full" style={{ clipPath: 'polygon(8% 0, 100% 0%, 100% 100%, 0 100%)' }} />
      </div>
    </div>
  )
}