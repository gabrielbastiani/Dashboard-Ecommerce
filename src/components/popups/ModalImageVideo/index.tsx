import Modal from 'react-modal';
import { FiX } from 'react-icons/fi';
import { ButtonClose, ContainerContent, TextModal, ImageVideo } from './styles';
import imageVideo from '../../../assets/EXEMPLO-VIDEO-PRODUTO.png';

interface VideoRequest {
    isOpen: boolean;
    onRequestClose: () => void;
    video: string;
}

export function ModalImageVideo({ isOpen, onRequestClose, video }: VideoRequest) {

    const customStyles = {
        content: {
            top: '50%',
            bottom: 'auto',
            left: '50%',
            right: 'auto',
            padding: '30px',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'black',
            zIndex: 9999999
        }
    };

    


    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
        >
            <ButtonClose
                type='button'
                onClick={onRequestClose}
                className='react-modal-close'
                style={{ background: 'transparent', border: 0, cursor: 'pointer' }}
            >
                <FiX size={45} color="#f34748" />
            </ButtonClose>

            <ContainerContent>
                <TextModal>Veja na imagem, o que você deve inserir no campo "Link video apresentação", veja que não é para copiar todo o link do video no Youtube, e sim apenas o código do video.</TextModal>

                <ImageVideo src={imageVideo} alt="foto loja" />
            </ContainerContent>
        </Modal>
    )
}