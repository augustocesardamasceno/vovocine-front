// Importações
import { Template, Button, InputText, useNotification, AuthenticatedPage, MovieCard } from '@/components';
import { EasyMovie } from '@/resources/films/movies.resources';
import { useMovieService } from '@/resources';
import { useState } from 'react';
import Link from 'next/link';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Interface para o componente MovieCarousel
interface MovieCarouselProps {
    movies: EasyMovie[];
    title: string;
}

// Componente MovieCarousel
const MovieCarousel: React.FC<MovieCarouselProps> = ({ movies, title }) => {
    const renderMovieCard = (movie: EasyMovie) => (
        <MovieCard
            key={movie.url}
            movieTitle={movie.movieTitle}
            src={movie.url}
            movieGenre={movie.movieGenre}
            duration={movie.duration}
            movieLink={movie.movieLink}
            country={movie.country}
        />
    );

    const yourCarouselSettings: SliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        // Adicione outras configurações conforme necessário
    };

    return (
        <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
            <Slider {...yourCarouselSettings}>
                {movies.map(renderMovieCard)}
            </Slider>
        </div>
    );
};

// Interface para as configurações do Slider
interface SliderSettings {
    dots: boolean;
    infinite: boolean;
    speed: number;
    slidesToShow: number;
    slidesToScroll: number;
    // Adicione outras configurações conforme necessário
}

// Componente GaleriaPage
const GaleriaPage: React.FC = () => {
    const useService = useMovieService();
    const notification = useNotification();
    const [movies, setMovies] = useState<EasyMovie[]>([]);
    const [query, setQuery] = useState<string>('');
    const [movieGenre, setGenre] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    async function searchMovies() {
        setLoading(true);
        const result = await useService.buscar(query, movieGenre);
        setMovies(result);
        setLoading(false);

        if (!result.length) {
            notification.notify('No results found!', 'warning');
        }
    }

    function renderMovieCards() {
        const genres = [...new Set(movies.map((movie) => movie.movieGenre))];
        return genres.map((genre) => {
            const genreMovies = movies.filter((movie) => movie.movieGenre === genre);
            return <MovieCarousel key={genre} movies={genreMovies} title={genre} />;
        });
    }

    return (
        <AuthenticatedPage>
            <Template loading={loading}>
                <section className="flex flex-col items-center justify-center my-5">
                    <div className="flex space-x-4">
                        <InputText placeholder='Insira o título' onChange={(event) => setQuery(event.target.value)} />
                        <select onChange={(event) => setGenre(event.target.value)} className="border px-4 py-2 rounded-lg text-gray-900">
                            <option value="">Todos os gêneros</option>
                            <option value="ACAO">Ação</option>
                            <option value="AVENTURA">Aventura</option>
                            <option value="COMEDIA">Comédia</option>
                            <option value="DRAMA">Drama</option>
                            <option value="FICCAO_CIENTIFICA">Ficção Científica</option>
                            <option value="ROMANCE">Romance</option>
                            <option value="TERROR">Terror</option>
                            <option value="ANIMACAO">Animação</option>
                            <option value="DOCUMENTARIO">Documentário</option>
                        </select>

                        <Button style='bg-blue-500 hover:bg-blue-300' label='Search' onClick={searchMovies} />

                        <Link href="/formulario">
                            <Button style='bg-green-500 hover:bg-green-300' label='Add Movie' />
                        </Link>
                    </div>
                </section>

                <section className="grid grid-cols-1 gap-8">
                    {renderMovieCards()}
                </section>
            </Template>
        </AuthenticatedPage>
    );
};

export default GaleriaPage;
