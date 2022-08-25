import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import './pagination.css';
function Page({ page, setPage, totalpages }) {
   
    function handleClick(e, index) {
        e.preventDefault();
        setPage(index);

    }
    return (

        <React.Fragment>

            <div className="pagination-wrapper">

                <Pagination aria-label="Page navigation example">

                    <PaginationItem disabled={page <= 0}>

                        <PaginationLink
                            onClick={e => handleClick(e, page - 1)}
                            previous
                            href="#"
                        />

                    </PaginationItem>

                    {[...Array(totalpages)].map((p, i) =>
                        <PaginationItem active={i === page} key={i}>
                            <PaginationLink onClick={e => handleClick(e, i)} href="#">
                                {i + 1}
                            </PaginationLink>
                        </PaginationItem>
                    )}

                    <PaginationItem disabled={page >= totalpages - 1}>

                        <PaginationLink
                            onClick={e => handleClick(e, page + 1)}
                            next
                            href="#"
                        />

                    </PaginationItem>
                </Pagination>
            </div>
        </React.Fragment>

    );

    // return (
    //     <Pagination>
    //         <PaginationItem>
    //             <PaginationLink
    //                 first
    //                 href="#"
    //             />
    //         </PaginationItem>
    //         <PaginationItem>
    //             <PaginationLink
    //                 href="#"
    //                 previous
    //             />
    //         </PaginationItem>
    //         {p}
    //         <PaginationItem>
    //             <PaginationLink
    //                 href="#"
    //                 next
    //             />
    //         </PaginationItem>
    //         <PaginationItem>
    //             <PaginationLink
    //                 href="#"
    //                 last
    //             />
    //         </PaginationItem>
    //     </Pagination>
    // );
}

export default Page;