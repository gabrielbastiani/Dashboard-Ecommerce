import {
    ContainerPagination,
    TextTotal,
    TotalCategorys,
    ContainerCategoryPage,
    TextPage,
    Previus,
    ButtonPage,
    Next
} from './styles';

interface PagesRequest {
    name: string;
    total: any;
    totalDocs: any;
    currentPage: any;
    search: any;
    numeroPaginas: any;
    limite: any;
    atual: any;
    onClick(): void;
}


const Paginacao = ({ search, numeroPaginas, name, atual, total, limite, totalDocs, currentPage, onClick }: PagesRequest) => {

    return (
        <ContainerPagination>
            <TotalCategorys key={total}>
                <TextTotal>Total de {name}: {totalDocs}</TextTotal>
            </TotalCategorys>
            <ContainerCategoryPage>
                {currentPage > 1 && (
                    <Previus>
                        <ButtonPage onClick={onClick}>
                            Voltar
                        </ButtonPage>
                    </Previus>
                )}
                {/* @ts-ignore */
                    [...Array(numeroPaginas).keys()].map((numero, idx) => {
                        const numeroAtualDaPagina = numero * limite;
                        return (
                            <TextPage
                                className={`paginacao-item ${numeroAtualDaPagina === atual ? "paginacao-item-active" : ""}`}
                                /* @ts-ignore */
                                onClick={() => onClick(numeroAtualDaPagina)}
                                key={idx}>
                                {numero + 1}
                            </TextPage>
                        );
                    })
                }
                {currentPage < search.length && (
                    <Next>
                        <ButtonPage onClick={onClick}>
                            Avançar
                        </ButtonPage>
                    </Next>
                )}
            </ContainerCategoryPage>
        </ContainerPagination>
    )
}

export default Paginacao;



{/* <ContainerPagination>
<TotalCategorys key={total}>
    <TextTotal>Total de categorias: {total}</TextTotal>
</TotalCategorys>
<ContainerCategoryPage>

    {currentPage > 1 && (
        <Previus>
            <ButtonPage onClick={() => setCurrentPage(currentPage - 1)}>
                Voltar
            </ButtonPage>
        </Previus>
    )}

    {pages.map((page) => (
        <TextPage
            key={page}
            onClick={() => setCurrentPage(page)}
        >
            {page}
        </TextPage>
    ))}

    {currentPage < search.length && (
        <Next>
            <ButtonPage onClick={() => setCurrentPage(currentPage + 1)}>
                Avançar
            </ButtonPage>
        </Next>
    )}

</ContainerCategoryPage>
</ContainerPagination> */}