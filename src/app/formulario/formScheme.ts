import * as Yup from 'yup'

export interface MovieRegistrationProps {
    movieTitle: string;
    movieGenre: string;
    duration: string;
    movieLink: string;
    country: string;
    file: string | Blob;
}

export const formScheme: MovieRegistrationProps = { movieTitle: '', movieGenre: '', duration: '', movieLink: '', country: '', file: '' }

export const formValidationScheme = Yup.object().shape({
    movieTitle: Yup.string().trim()
            .required('Insira o título do filme')
            .max(50, 'O título do filme não pode ter mais de 50 caracteres'),
    movieGenre: Yup.string().trim()
            .required('Insira o gênero do filme!'),
    duration: Yup.string().trim()
            .required('Insira a duração do filme'),
    movieLink: Yup.string().trim()
        .required('Insira o link do filme'),
    country: Yup.string().trim()
        .required('Insira o país de origem do filme'),
    file: Yup.mixed<Blob>()
            .required('Faça o upload do poster do filme!')
            .test('size', 'File size cannot be higher than 4 MB', (file) => {
                return file.size < 4000000;
            })
            .test('type', 'Accepted formats: jpeg, giff or png', (file) => {
                return file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif';
            })
})