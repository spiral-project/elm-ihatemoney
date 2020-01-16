let srcs = import ./nix/sources.nix;
    pkgs = import srcs.nixpkgs {}; in

with pkgs;

mkShell {
  name = "elm-env";
  buildInputs = with elmPackages; [ elm elm-test ];
}


