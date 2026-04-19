# Handoff

## Current status

- Audited and hardened the ChessWize production VPS at `178.104.163.26`.
- Verified SSH hardening is active and tightened crypto/KEX/MAC policy.
- Applied kernel/sysctl hardening for redirects, martian logging, sysrq, core
  dumps, and strict `rp_filter` while keeping `ip_forward=1` for Docker.
- Enabled persistent journald limits and rsyslog forwarding config.
- Installed and enabled `auditd`.
- Installed `aide` and generated initial database at
  `/var/lib/aide/aide.db.new`.
- Tightened `/data/coolify/source/.env` to `600` and backed it up to
  `/root/coolify-source.env.backup`.
- Updated Docker log rotation in `/etc/docker/daemon.json` to `10m` x `5`.
- Masked `postfix` after it was installed as an `aide` dependency and briefly
  opened port `25`.
- Updated Hetzner firewall to allow only `22`, `80`, `443`, `8000` from
  `49.36.144.38/32`, and ICMP.
- Enabled Cloudflare `security_header` HSTS and confirmed
  `always_use_https=on`, `automatic_https_rewrites=on`.
- Cloudflare zone `chesswize.in` is now `active`.

## Important remaining gaps

- Docker-published ports `8000`, `8080`, `6001`, and `6002` are still listening
  on the host even though UFW no longer lists them.
- This means UFW is not sufficient here because Docker proxy rules bypass it.
- Recommended next fix: add Docker-aware `DOCKER-USER` iptables or nftables
  rules, or change Coolify/Traefik publishing so only required ports bind on
  the host.
- The local backup timer/service creation did not complete because an earlier
  remote command aborted. `/root/backups/coolify` does not exist yet.
- `aide` baseline exists only as `/var/lib/aide/aide.db.new`; promote it to the
  live DB after review.
- Cloudflare managed WAF/rate-limit rules were not auto-applied because the
  Free plan/API flow expects Managed Rulesets entrypoints rather than the old
  `waf` toggle.

## Last prompts

- User asked for a deep production infrastructure security audit and hardening
  pass across OS, firewall, Docker/Coolify, Cloudflare, backups, and
  monitoring.
- User requested a final report with findings, remediations applied, and
  remaining recommendations.

## Useful commands

- SSH back in:
  `ssh -i ~/.ssh/id_ed25519 -o StrictHostKeyChecking=no root@178.104.163.26`
- Check effective SSH policy:
  `sshd -T | egrep "^(permitrootlogin|passwordauthentication|maxauthtries|maxsessions|maxstartups|ciphers|macs|kexalgorithms)"`
- Check exposed listeners:
  `ss -tulpn | egrep ":(22|80|443|8000|8080|6001|6002)\\b"`
- Check Hetzner firewall:
  `curl -s -H 'Authorization: Bearer <TOKEN>' https://api.hetzner.cloud/v1/firewalls/10861784`
