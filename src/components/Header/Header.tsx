import { Link } from 'react-router-dom';
import { Button } from "@/components/ui";
import { CREATE_INVOICE_PATH, HOME_PATH } from '@/routes';

/**
 * Header component
 *
 * This component is the header of the application. It's a functional component
 * that returns a JSX element.
 *
 * The component contains a link to the home page and a link to the create invoice
 * page.
 *
 * The component uses the Link component from react-router-dom to create the links.
 *
 * The component uses the Button component from the ui module to create the links.
 */
export const Header: React.FC = () => {
    return (
        <header className="bg-white shadow">
            <div className="container mx-auto px-2 sm:px-10 py-3 flex justify-between items-center">
                <Link to={HOME_PATH}>
                    <h1 className="text-2xl font-extrabold text-neutral-950">
                        Invoice App
                    </h1>
                </Link>
                <div className="flex gap-3 sm:gap-10">
                    <Link to={HOME_PATH}>
                        <Button variant="link" className='p-0'>
                            Invoice List
                        </Button>
                    </Link>
                    <Link to={CREATE_INVOICE_PATH}>
                        <Button variant="link" className='p-0'>
                            Create Invoice
                        </Button>
                    </Link>
                </div>
            </div>
        </header>
    );
};