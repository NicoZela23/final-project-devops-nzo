import FlavorFLexLogo from '../../assets/FLAVORFLEX.svg'

function Footer (){
  return (
    <footer className="py-8 flex flex-col gap-3 items-center bg-rose-200 opacity-75">
      <img 
        src={FlavorFLexLogo} 
        alt="FlavorFlex logo" 
        className="h-16 w-auto"
      />
      <p>&copy; {new Date().getFullYear()} Flavor Flex. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
