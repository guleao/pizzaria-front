//package DtoTest;
//
//import br.com.uniamerica.pizzaria.pizarria.dto.UsuarioDTO;
//import org.junit.jupiter.api.Assertions;
//import org.junit.jupiter.api.Test;
//
//class UsuarioDtoTest {
//    UsuarioDTO usuario = new UsuarioDTO("Gustavo");
//    UsuarioDTO usuario4 = new UsuarioDTO();
//
//    @org.junit.jupiter.api.Test
//    void testConstrutorVazio(){
//        UsuarioDTO usuario5 = new UsuarioDTO();
//        Assertions.assertEquals(usuario4, usuario5);
//    }
//
//    @Test
//    void testSetarNome(){
//        usuario.setNomeUsuario("Gabriel");
//        Assertions.assertEquals("Gabriel", usuario.getNomeUsuario());
//    }
//
//    @Test
//    void testComparacaoNomes(){
//        UsuarioDTO usuario2 = new UsuarioDTO("Gustavo");
//        Assertions.assertEquals(usuario, usuario2);
//    }
//    @Test
//    void testId(){
//        usuario.setId(1L);
//        Assertions.assertEquals(1, usuario.getId());
//    }
//
//}
