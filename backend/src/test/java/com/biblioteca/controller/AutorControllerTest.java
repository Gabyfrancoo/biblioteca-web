package com.biblioteca.controller;

import com.biblioteca.model.Autor;
import com.biblioteca.repository.AutorRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(AutorController.class)
class AutorControllerTest {

    @Autowired MockMvc mockMvc;
    @Autowired ObjectMapper mapper;
    @MockBean AutorRepository repository;

    private Autor autor(Long id, String nome) {
        Autor a = new Autor();
        a.setId(id);
        a.setNome(nome);
        a.setNacionalidade("Brasileira");
        return a;
    }

    @Test
    void deveCriarAutorComSucesso() throws Exception {
        Autor salvo = autor(1L, "Machado de Assis");
        when(repository.save(any(Autor.class))).thenReturn(salvo);

        mockMvc.perform(post("/api/autores")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(autor(null, "Machado de Assis"))))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.nome").value("Machado de Assis"));
    }

    @Test
    void deveRetornar404ParaAutorInexistente() throws Exception {
        when(repository.findById(99L)).thenReturn(Optional.empty());

        mockMvc.perform(get("/api/autores/99")).andExpect(status().isNotFound());
    }

    @Test
    void deveListarAutoresOrdenados() throws Exception {
        when(repository.findAllByOrderByNomeAsc())
                .thenReturn(List.of(autor(1L, "Clarice"), autor(2L, "Machado")));

        mockMvc.perform(get("/api/autores"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].nome").value("Clarice"))
                .andExpect(jsonPath("$[1].nome").value("Machado"));
    }
}
