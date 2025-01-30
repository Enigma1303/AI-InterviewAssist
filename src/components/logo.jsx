
import { Link } from 'react-router-dom'

export default function LogoContainer() {
  return (
    <div>
        {/* Basically the logo should take me to the home page*/}
      <Link to="/">
      <img src="/assets/svg/logo.svg" className="min-h-10 min-w-10 object-contain"></img>
      </Link>
    </div>
  )
}
