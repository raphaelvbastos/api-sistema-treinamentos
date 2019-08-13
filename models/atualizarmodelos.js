var cursoModel = require("./cursomodel");

class AtualizarModelos {

    AtualizarModelos() { }

    atualizarUsuario(objetoUsuario, remover, res) {
        // curso.usuarios[]
        // curso.avaliacoes.usuario[]
        // curso.unidades.videos.vistoPor[]
        // curso.unidades.questionarios.questoes.respostas[]

        // todos os curso que o usuário esta inscrito
        cursoModel.find({ 'usuarios._id': objetoUsuario._id }, (err, av) => {
            if (av.length > 0) {

                av.forEach(curso => {

                    // curso => inscricoes
                    let inscricao = curso.inscricoes.find(usu => usu.usuario._id == "" + objetoUsuario._id);

                    if(inscricao != null) {
                        let pos = curso.inscricoes.findIndex(usu => usu.usuario._id == "" + objetoUsuario._id);
                        inscricao.usuario = objetoUsuario;
                        curso.inscricoes.splice(pos, 1);
                        if (!remover) {
                            curso.inscricoes.push(inscricao);
                        }
                    }

                    // curso.avaliacoes.usuario[
                    let avaliacao = curso.avaliacoes.findIndex(ava => ava.usuario._id == "" + objetoUsuario._id);

                    if (avaliacao > -1) {
                        if (remover) {
                            curso.avaliacoes.splice(avaliacao, 1);
                        } else {
                            curso.avaliacoes[avaliacao].usuario = objetoUsuario;
                        }
                    }


                    // curso.unidades.videos.vistoPor[]
                    let unidade = curso.unidades.filter(uni => uni.videos.filter(vd => vd.vistoPor.find(u => u._id == "" + objetoUsuario._id)));

                    unidade.forEach(un => {

                        un.videos.forEach(vd => {
                            let indiceUsuario = vd.vistoPor.findIndex(u => u._id == "" + objetoUsuario._id);

                            if (indiceUsuario > -1) {
                                vd.vistoPor.splice(indiceUsuario, 1);

                                if (!remover) {
                                    vd.vistoPor.push(objetoUsuario);
                                }
                            }
                        });

                        un.questionarios.forEach(qtn => {
                            qtn.questoes.forEach(ques => {
                                let pos = ques.respostas.findIndex(resp => resp.usuario._id == "" + objetoUsuario._id);

                                if (pos > -1) {
                                    if (remover) {
                                        ques.respostas.splice(pos, 1);
                                    } else {
                                        ques.respostas[pos].usuario = objetoUsuario;
                                    }
                                }

                                // ques.respostas.forEach(resp => {
                                //     resp.usuario.nome = "AAAAAAAAAA";
                                //     // res.json(resp.usuario);
                                // });
                            });
                        });

                    });

                    cursoModel.findOneAndUpdate({ _id: curso._id }, curso, { upsert: true }, (err, doc) => {
                        if (err) {
                            res.status(500).json({ error: err.message });
                            res.end();
                            return;
                        }
                        res.json(objetoUsuario);
                        res.end();
                    });

                    // res.json(curso);
                    // console.log(curso);
                    // return curso;
                });
            } else {
                res.json(objetoUsuario);
                res.end();
            }
        });
    }

    atualizarUnidade(objetoUnidade, remover, res) {
        cursoModel.findOne({ 'unidades._id': objetoUnidade._id }, (err, curso) => {
            if (typeof curso != "undefined") {
                let indUni = curso.unidades.findIndex(u => u._id == "" + objetoUnidade._id);

                if (indUni > -1) {
                    curso.unidades.splice(indUni, 1);

                    if (!remover) {
                        curso.unidades.push(objetoUnidade);
                    }
                }

                res.json(objetoUnidade);
            }
        });
    }

    atualizarAvaliacao(objetoAvaliacao, remover, res) {
        cursoModel.findOne({ 'avaliacoes._id': objetoAvaliacao._id }, (err, curso) => {
            if (typeof curso != "undefined") {
                let indUni = curso.avaliacoes.findIndex(u => u._id == "" + objetoAvaliacao._id);

                if (indUni > -1) {
                    curso.avaliacoes.splice(indUni, 1);

                    if (!remover) {
                        curso.avaliacoes.push(objetoAvaliacao);
                    }
                }
                res.json(curso);
            }
        });
    }

    atualizarCurso(objetoCurso, remover, res) {
        cursoModel.findOne({ '_id': objetoCurso._id }, (err, curso) => {
            if (typeof curso != "undefined") {
                // if (!remover) {
                //     curso.avaliacoes.push(objetoAvaliacao);
                // }
                res.json(curso);
            }
        });
    }

    atualizarVideo(objetoVideo, remover, res) {
        cursoModel.find({}, (err, av) => {
            if (av.length > 0) {
                av.forEach(curso => {
                    let unidade = curso.unidades.find(uni => uni.videos.find(qtn => qtn._id == "" + objetoVideo._id));

                    if (typeof unidade != "undefined") {
                        let indArquivo = unidade.videos.findIndex(v => v._id == "" + objetoVideo._id);

                        if (indArquivo > -1) {
                            unidade.videos.splice(indArquivo, 1);

                            if (!remover) {
                                unidade.videos.push(objetoVideo);
                            }
                        }
                        res.json(curso);
                    }
                });
            }
        });
    }

    atualizarArquivo(objetoArquivo, remover, res) {
        cursoModel.find({}, (err, av) => {
            if (av.length > 0) {
                av.forEach(curso => {
                    let unidade = curso.unidades.find(uni => uni.arquivos.find(qtn => qtn._id == "" + objetoArquivo._id));

                    if (typeof unidade != "undefined") {
                        let indArquivo = unidade.arquivos.findIndex(v => v._id == "" + objetoArquivo._id);

                        if (indArquivo > -1) {
                            unidade.arquivos.splice(indArquivo, 1);

                            if (!remover) {
                                unidade.arquivos.push(objetoArquivo);
                            }
                        }
                        res.json(curso);
                    }

                });
            }
        });
    }

    atualizarQuestionario(objetoQuestionario, remover, res) {
        cursoModel.find({}, (err, av) => {
            if (av.length > 0) {
                av.forEach(curso => {
                    let unidade = curso.unidades.find(uni => uni.questionarios.find(qtn => qtn._id == "" + objetoQuestionario._id));

                    if (typeof unidade != "undefined") {
                        let indArquivo = unidade.questionarios.findIndex(v => v._id == "" + objetoQuestionario._id);

                        if (indArquivo > -1) {
                            unidade.questionarios.splice(indArquivo, 1);

                            if (!remover) {
                                unidade.questionarios.push(objetoQuestionario);
                            }
                        }
                        res.json(curso);
                    }

                });
            }
        });
    }

    atualizarAlternativa(objetoAlternativa, remover, res) {
        cursoModel.find({}, (err, av) => {
            if (av.length > 0) {
                av.forEach(curso => {
                    let unidade = curso.unidades.find(uni => uni.questionarios.find(qtn => qtn.questoes.find(ques => ques.alternativas.find(alt => alt._id == "" + objetoAlternativa._id))));

                    if (typeof unidade != "undefined") {
                        unidade.questionarios.forEach(qtn => {
                            qtn.questoes.forEach(ques => {
                                let pos = ques.alternativas.findIndex(alt => alt._id == "" + objetoAlternativa._id);

                                if (pos > -1) {
                                    ques.alternativas.splice(pos, 1);

                                    if (!remover) {
                                        ques.alternativas.push(objetoAlternativa);
                                    }
                                }

                                pos = ques.respostas.findIndex(resp => resp._id == "" + objetoAlternativa._id);

                                if (pos > -1) {
                                    ques.respostas.splice(pos, 1);
                                }
                            });
                        });
                        res.json(curso);
                    }
                });
            }
        });
    }

    atualizarQuestao(objetoQuestao, remover, res) {
        cursoModel.find({}, (err, av) => {
            if (av.length > 0) {
                av.forEach(curso => {
                    let unidade = curso.unidades.find(uni => uni.questionarios.find(qtn => qtn.questoes.find(qt => qt._id == "" + objetoQuestao._id)));

                    if (typeof unidade != "undefined") {
                        unidade.questionarios.forEach(qtn => {
                            let pos = qtn.questoes.findIndex(alt => alt._id == "" + objetoQuestao._id);

                            if (pos > -1) {
                                qtn.questoes.splice(pos, 1);

                                if (!remover) {
                                    qtn.questoes.push(objetoQuestao);
                                }
                            }
                        });
                        res.json(curso);
                    }
                });
            }
        });
    }
}

module.exports = AtualizarModelos;
