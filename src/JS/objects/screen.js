const screen = {
    userProfile: document.querySelector(".profile-data"),
    renderUser(user) {
        this.userProfile.innerHTML = `<div class="info">
                                        <img src="${user.avatarUrl}" alt="Foto do perfil do usuário"/>
                                        <div class="data">
                                            <h1>${user.name ?? "Não possui nome cadastrado ;("}</h1>
                                            <p>${user.bio ?? "Não possui bio cadastrada ;("}</p>
                                            <div class="followers">
                                                <p>Seguindo: <br>  <strong>${user.following}</strong></p>
                                                <p>Seguidores: <br>  <strong>${user.followers}</strong></p>
                                            </div>
                                        </div>
                                    </div>`

        let repositoriesItens = ""
        user.repositories.forEach(repo => repositoriesItens += `
                        <li><a href="${repo.html_url}" target="_blank">${repo.name} <br>
                        <div class="repo-info">
                            <p><i class="fas fa-utensils"></i> ${repo.forks_count}</p>
                            <p><i class="fas fa-star"></i> ${repo.stargazers_count}</p>
                            <p><i class="far fa-eye"></i> ${repo.watchers_count}</p>
                            <p><i class="fas fa-window-restore"></i> ${repo.language ?? "??"}</p>
                        </div>
                        </a></li>`)

        if(user.repositories.length > 0) {
            this.userProfile.innerHTML += `<div class="repositories section"> 
                                            <h2>Repositórios</h2>
                                            <ul>${repositoriesItens}</ul>
                                            </div>`
        }

        let eventsItens = ""
        user.events.forEach(event => {
            if(event.type === "PushEvent") {
                eventsItens += `<li><p><strong>${event.repo.name}</strong>: - "${event.payload.commits[0].message}"</p></li>`
            } if(event.type === "CreateEvent") {
                eventsItens += `<li><p><strong>${event.repo.name}</strong>: - “Sem mensagem de commit”</p></li>`
            }
        })

        if(user.events.length > 0) {
            this.userProfile.innerHTML += `<div class="events section"> 
                                            <h2>Eventos</h2>
                                            <ul>${eventsItens}</ul>
                                            </div>`
        }
        
    },
    renderNotFound() {
        this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>"
    }
}

export { screen }